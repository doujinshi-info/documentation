var marked = require('marked');
var fs = require('fs');
var highlight = require('highlight.js');
var Handlebars = require('handlebars');
var path = require('path');
var sass = require('node-sass');
var copyfiles = require('copyfiles');

copyfiles(["./src/assets/img/*.png", "./src/assets/js/all.js", "./dist/"], true, function (err) {
  if (err) {
    console.error(err);
  }
});

sass.render({
  file: './src/assets/scss/index.scss',
  outputStyle: 'compressed',
  outFile: './dist/style.css',
}, function(error, result) {
  if (!error) {
    fs.writeFile('./dist/style.css', result.css, function(err) {
      if (!err) {
      }
    });
  }
});

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    return highlight.highlight(lang, code).value;
  },
});

// Create syntax-highlighting alias 'shell' for 'bash'
var bash = highlight.getLanguage('bash');

highlight.registerLanguage('shell', function (highlight) {
  return bash;
})

// Easier than changing Slate's js
marked.defaults.langPrefix = 'highlight ';

Handlebars.registerHelper('str', function (item) {
  return '"' + item + '"';
})

Handlebars.registerHelper('html', function (content) {
  return new Handlebars.SafeString(content);
})

fs.readFile('./src/index.md', 'utf8', function (err, content) {
  if (err) {
    console.log(err);
  }

  content = content.split(/---/g);

  if (content.length === 1) {
    throw new Error('No markdown page settings found!');
  }

  var data = {};
  var tokens = new marked.Lexer().lex(content[1]);
  var token;
  var listName;

  for (var idx = 0; idx < tokens.length; idx++) {
    token = tokens[idx];

    if (token.type === 'list_item_start') {
      token = tokens[idx + 1].text;

      if (listName === 'language_tabs') {
        var lang = token;
        var langSplit = lang.split(':');

        if (langSplit.length === 1) {
          token = {name: langSplit[0], text: langSplit[0]};
        }

        if (langSplit.length === 2) {
          token = {name: langSplit[0], text: langSplit[1]};
        }
      }
      data[listName].push(token);
      idx += 2;
    }

    if (token.type === 'paragraph') {
      if (tokens[idx + 1] !== undefined && tokens[idx + 1].type === 'list_start') {
        listName = token.text.slice(0, -1);
        data[listName] = [];
      } else {
        token = token.text.split(': ');
        data[token[0]] = token[1];
      }
    }
  }

  if (data.includes) {
    // create partials
    for (var i = 0; i < data.includes.length; i++) {
      var includeFileName = data.includes[i];
      var includeFilePath = path.resolve(__dirname, 'src/includes', includeFileName + '.md');
      var includeContent = fs.readFileSync(includeFilePath, {encoding: 'utf8'});
      var markedInclude = marked(includeContent);

      Handlebars.registerPartial(includeFileName, markedInclude);
    }
  }

  fs.readFile('./src/layouts/layout.html', 'utf8', function (err, source) {
    if (err) {
      console.log(err);
    }

    if (data.includes) {
      var includes = '';

      for (var i = 0; i < data.includes.length; i++) {
        var include = data.includes[i];

        includes += '\n' + '{{> ' + include + ' }}'
      }

      source = source.replace(/{{{html content}}}/g, '{{{html content}}}' + includes);
    }

    var template = Handlebars.compile(source);

    data['content'] = marked(content.slice(2).join(''));

    fs.writeFile('./dist/index.html', template(data), function (err) {
      if (err) {
        console.log(err);
      }
    });
  })
})
