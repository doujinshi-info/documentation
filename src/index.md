---
title: Doujinshi.info API

language_tabs:
  - shell: cURL

search: true
---

# Introduction

Welcome to the Doujinshi.info REST API. You can use our API to access Doujinshi.info API endpoints, which can provide information on various Japanese doujinshi in our database.

# Authentication

## Registration

Create a new user account.

> Request example

```shell
curl "https://api.doujinshi.info/v1/auth/create" \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Kisuka",
    "email": "kisuka@doujinshi.info",
    "password": "secret",
    "password_confirmation": "secret"
  }'
```

> Reponse example

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ1NjM0LCJleHAiOjE1MzYwNDY1MzQsInN1YiI6IkxZQW40bDdMbUdsaiIsIm5hbWUiOiJLaXN1a2EyMiIsInNsdWciOiJraXN1a2EyMiIsImlzX2FkbWluIjpmYWxzZSwiaXNfbW9kIjpmYWxzZX0.uZP2M-x3RzUO3J2WOKMP7bumDT8-_G1MDHERqyiz3SI",
  "refresh_token": "30d3ee954db60ce30bde51d3f88e9f9a9ae97eb4a4d723bd7d88985994f1e414"
}
```

`POST https://api.doujinshi.info/v1/auth/create`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| name | string | Required | The user's desired profile name. |
| email | string | Required | The user's email address. |
| password | string | Required | The user's secure password. |
| password_confirmation | string | Required | The confirmation for the password. |

## Login

Login to receive an access token and refresh token. The access token is used to interacte with protected endpoints. The refresh token is used to create new access tokens.

> Request example

```shell
curl "https://api.doujinshi.info/v1/auth/login" \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "kisuka@doujinshi.info",
    "password": "secret"
  }'
```

> Reponse example

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ1ODY5LCJleHAiOjE1MzYwNDY3NjksInN1YiI6IkxZQW40bDdMbUdsaiIsIm5hbWUiOiJLaXN1a2EyMiIsInNsdWciOiJraXN1a2EyMiIsImlzX2FkbWluIjpmYWxzZSwiaXNfbW9kIjpmYWxzZX0.jP4ebJwd1bifVNO5YOL1ztx90OPG-YLKnmgpBxtVkjo",
  "refresh_token": "30d3ee954db60ce30bde51d3f88e9f9a9ae97eb4a4d723bd7d88985994f1e414"
}
```

### HTTP Request

`POST https://api.doujinshi.info/v1/auth/login`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| email | string | Required | The user's email address attached to their account. |
| password | string | Required | The user's secure password. |

## Refresh Token

As a security method, all access tokens expire after 15 minutes. Access tokens are only to be used for short operations and will need to be refreshed. A user's refresh token can be used to generate a new access token once it has expired.

> Request example

```shell
curl "https://api.doujinshi.info/v1/auth/login" \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "user": "RZe14xe6YAba",
    "refresh_token": "30d3ee954db60ce30bde51d3f88e9f9a9ae97eb4a4d723bd7d88985994f1e414"
  }'
```

> Reponse example

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ1ODY5LCJleHAiOjE1MzYwNDY3NjksInN1YiI6IkxZQW40bDdMbUdsaiIsIm5hbWUiOiJLaXN1a2EyMiIsInNsdWciOiJraXN1a2EyMiIsImlzX2FkbWluIjpmYWxzZSwiaXNfbW9kIjpmYWxzZX0.jP4ebJwd1bifVNO5YOL1ztx90OPG-YLKnmgpBxtVkjo"
}
```

### HTTP Request

`POST https://api.doujinshi.info/v1/auth/login`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| user | string | Required | The user's ID hash. |
| refresh_token | hash | Required | The user's secure refresh token. |

## Logout

Blacklist the user's refresh token so that it can no longer be used to generate new access tokens.

> Request example

```shell
curl "https://api.doujinshi.info/v1/auth/logout" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ1ODY5LCJleHAiOjE1MzYwNDY3NjksInN1YiI6IkxZQW40bDdMbUdsaiIsIm5hbWUiOiJLaXN1a2EyMiIsInNsdWciOiJraXN1a2EyMiIsImlzX2FkbWluIjpmYWxzZSwiaXNfbW9kIjpmYWxzZX0.jP4ebJwd1bifVNO5YOL1ztx90OPG-YLKnmgpBxtVkjo' \
  -H 'Content-Type: application/json' \
  -d '{
    "user": "RZe14xe6YAba",
    "refresh_token": "30d3ee954db60ce30bde51d3f88e9f9a9ae97eb4a4d723bd7d88985994f1e414"
  }'
```
### HTTP Request

`POST https://api.doujinshi.info/v1/auth/logout`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| user | string | Required | The user's ID hash. |
| refresh_token | hash | Required | The user's secure refresh token. |

# Pagination

All `GET` endpoints that return an object list support cursor based pagination. To make things easier, any paginated results provide a constructed call to the next page via the `next_page_url` value.

The default `limit` parameter is set to 24 can be raised up to 100.

The results are ordered in descending order of creation date.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag?page=1&limit=24"
```

> Reponse example

```json
{
   "meta":{
      "total":344,
      "per_page":24,
      "current_page":1,
      "last_page":15,
      "next_page_url":"https://api.doujinshi.info/v1/tag?page=2"
   },
   "data":[
      ...
   ]
}
```

### Query Parameters

| Parameter | Default | Description |
| ---- | ---- | ---- |
| page | 1 | Specifies which page to return. |
| limit | 24 | Number of results to return per page, limited up to 100. |

# Tags

## Get All Tag Categories

Returns a list of all the tag types that are available in the database. Each of these types have a large number of tags categorized within them.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag/types"
```

> Response example

```json
{
  "data":[
    {
       "id":"JYB3my24XqGN",
       "name":{
          "japanese":"芸術家",
          "romaji":"geijutsuka",
          "english":"Artist"
       },
       "slug":"artist"
    }
    ...
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/tag/types`

## Get All Tags

Returns a list of tags present within the database. This list is displays the most recent tags first.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag"
```

> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":"https://api.doujinshi.info/v1/tag?page=2"
  },
  "data":[
    {
      "id":"lEJgmWe76vWz",
      "type":{
        "id":"oWYqmql9lJPj",
        "name":{
          "japanese":"シリーズ",
          "romaji":"shirizu",
          "english":"Series"
        },
        "slug":"series"
      },
      "name":{
        "japanese":"ギルティクラウン",
        "romaji":"Girutei Kuraun",
        "english":"Guilty Crown"
      },
      "slug":"girutei-kuraun",
      "created_at":"2017-01-29 09:09:03",
      "updated_at":"2017-01-29 09:09:03"
    }
  ]
}
```

This endpoint retrieves all tags.

### HTTP Request

`GET https://api.doujinshi.info/v1/tag`

## Get All Tags By Category

Returns a list of tags categorized into a specific tag type. The list is in newest to oldest order.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag/content"
```

> Response example

```json
{
   "meta":{
      "total":1,
      "per_page":24,
      "current_page":1,
      "last_page":1,
      "next_page_url":"https://api.doujinshi.info/v1/tag/content?page=2"
   },
   "data":[
      {
         "id":"NXE4RgK26nj7",
         "type":{
            "id":"OMbP6nM4jYBn",
            "name":{
               "japanese":"コンテンツ",
               "romaji":"kontentsu",
               "english":"Content"
            },
            "slug":"content"
         },
         "name":{
            "japanese":"アヘ顔",
            "romaji":"Ahegao",
            "english":""
         },
         "aliases": [
            "Acme Face"
         ],
         "slug":"ahegao",
         "description":{
            "japanese":"",
            "english":"",
         },
         "created_at":"2017-11-20 09:21:15",
         "updated_at":"2017-12-24 21:07:48"
      }
   ]
}
```
### HTTP Request

`GET https://api.doujinshi.info/v1/tag/{type}`

## Get Specific Tag

Returns information regarding a specific tag. Also includes doujinshi that are tagged with the tag.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag/series/naruto"
```

> Response example

```json
{
  "data":{
    "id":"JYB3my1emXqG",
    "type":{
       "id":"oWYqmql9lJPj",
       "name":{
          "japanese":"シリーズ",
          "romaji":"Shirizu",
          "english":"Series"
       },
       "slug":"series"
    },
    "name":{
       "japanese":"NARUTO",
       "romaji":"NARUTO",
       "english":null
    },
    "slug":"naruto",
    "created_at":"2017-01-29 09:09:44",
    "updated_at":"2017-01-29 09:09:44",
    "books":{
       "meta":{
          "total":1,
          "per_page":24,
          "current_page":1,
          "last_page":1,
          "next_page_url":"https://api.doujinshi.info/v1/tag/series/naruto?page=2"
       },
       "data":[
          {
            "id":"OMbP6nM4jYBn",
            "name":{
              "japanese":"PSM・2淫忍修行",
              "romaji":"PSM2 In Nin Shugyou",
              "english":"ParM SpeciaL 02 Indecent Ninja Training"
            },
            "slug":"parm-special-02-in-nin-shugyou",
            "date_released":"2006-08-11",
            "pages":24,
            "price":858,
            "is_adult":true,
            "is_copybook":false,
            "is_anthology":false,
            "is_novel":false,
            "links":{
              "toranoana":"http://www.toranoana.jp/mailorder/article/04/0010/10/50/040010105014.html"
            },
            "cover":"https://cdn.doujinshi.info/images/rkKSl48FjbY5G6diUhu5trSn.jpg",
            "samples":[
              "https://cdn.doujinshi.info/images/Jb8i7Ls1l0QyJPpqcgI648Bm.jpg",
              "https://cdn.doujinshi.info/images/CFbba5HeKNu7M5MI2CnymIMX.jpg"
            ],
            "created_at":"2017-01-30 01:35:37",
            "updated_at":"2017-12-28 11:53:49"
          }
       ]
    }
  }
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/tag/{category}/{tag}`

## Get Tag's Changelog

Returns a list of changes made to a specific tag.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag/artist/hisashi-utage/changelog"
```

> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"J5KBm800mEPp",
      "type":"create",
      "user":{
        "name":"Kisuka",
        "slug":"kisuka"
      },
      "book":null,
      "tag":{
        "id":"8po9japv6EPg",
        "type":{
          "id":"JYB3my24XqGN",
          "name":{
            "japanese":"芸術家",
            "romaji":"geijutsuka",
            "english":"Artist"
          },
          "slug":"artist"
        },
        "name":{
          "japanese":"寿宴",
          "romaji":"Hisashi Utage",
          "english":null
        },
        "slug":"hisashi-utage",
        "created_at":"2018-07-24 08:49:14",
        "updated_at":"2018-07-24 08:49:14"
      },
      "transaction_id":"dpK9eVxDm5jo",
      "amount":33,
      "created_at":"2018-07-24 08:49:14"
    }
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/tag/{category}/{tag}/changelog`

## Create Tag

Creates a new tag within the database that can be used to tag doujinshi.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "convention",
    "name_japanese": "コミックマーケット 84"
  }'
```

> Response example

```json
{
  "id":"Jyp4oapa9271",
  "type":{
    "id":"LYAn4lL4Gljz",
    "name":{
      "japanese":"イベント",
      "romaji":"ibento",
      "english":"Convention"
    },
    "slug":"convention"
  },
  "name":{
    "japanese":"コミックマーケット 84",
    "romaji":"komikkumaketto 84",
    "english":null
  },
  "slug":"komikkumaketto-84",
  "created_at":"2018-09-03 20:05:39",
  "updated_at":"2018-09-03 20:05:39",
  "tags":{
    "data":[]
  },
  "books":{
    "meta":{
        "total":0,
        "per_page":24,
        "current_page":1,
        "last_page":1,
        "next_page_url":null
    },
    "data":[]
  }
}
```

### HTTP Request

`POST https://api.doujinshi.info/v1/tag`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| type | string | Required | The unique ID of the tag type. |
| name_japanese | string | Required | The original Japanese spelling of the tag name. |
| name_romaji | string | Optional | The romanized version of the Japanese name. This will be generated automatically if not set. |
| name_english | string | Optional | The english translated version of the Japanese name. |
| aliases | array | Optional | Any alternative names or aliases. |
| description_english | string | Optional | English description of the tag, mostly used for content tags. |
| description_japanese | string | Optional | Japanese description of the tag, mostly used for content tags. |
| date_start | string | Optional | The start date of a convention tag. |
| date_end | string | Optional | The end date of a convention tag. |
| tags | array | Optional | Child tags that belong to this tag. Such as characters under a series or artists under a circle. |
| links | array | Optional | Links to pixiv, twitter, and other various social media. |


## Update Tag

Updates the information on an existing tag. Parameters that are not passed will be removed from the existing records. For example, if a tag has a name_english field filled out currently but null is passed for name_english during an update, then it'll be removed.

> Request example

```shell
curl "https://api.doujinshi.info/v1/tag/convention/84" \
  -X PUT \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -H 'Content-Type: application/json' \
  -d '{
    "name_japanese": "コミックマーケット 84",
    "name_romaji": "Komikku Maketto 84",
    "name_english": "Comic Market 84"
  }'
```

> Response example

```json
{
  "id":"Jyp4oapa9271",
  "type":{
    "id":"LYAn4lL4Gljz",
    "name":{
      "japanese":"イベント",
      "romaji":"ibento",
      "english":"Convention"
    },
    "slug":"convention"
  },
  "name":{
    "japanese":"コミックマーケット 84",
    "romaji":"Komikku Maketto 84",
    "english":"Comic Market 84"
  },
  "slug":"komikkumaketto-84",
  "created_at":"2018-09-03 20:05:39",
  "updated_at":"2018-09-03 20:06:59",
  "tags":{
    "data":[]
  },
  "books":{
    "meta":{
      "total":0,
      "per_page":24,
      "current_page":1,
      "last_page":1,
      "next_page_url":null
    },
    "data":[]
  }
}
```

### HTTP Request

`PUT https://api.doujinshi.info/v1/tag/{type}/{slug}`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| name_japanese | string | Required | The original Japanese spelling of the tag name. |
| name_romaji | string | Optional | The romanized version of the Japanese name. This will be generated automatically if not set. |
| name_english | string | Optional | The english translated version of the Japanese name. |
| aliases | array | Optional | Any alternative names or aliases. |
| description_english | string | Optional | English description of the tag, mostly used for content tags. |
| description_japanese | string | Optional | Japanese description of the tag, mostly used for content tags. |
| date_start | string | Optional | The start date of a convention tag. |
| date_end | string | Optional | The end date of a convention tag. |
| tags | array | Optional | Child tags that belong to this tag. Such as characters under a series or artists under a circle. |
| links | array | Optional | Links to pixiv, twitter, and other various social media. |

# Doujinshi

## Get All Doujinshi

Returns a list of the doujinshi present within the database. Ordered from newest to oldest.

> Request example

```shell
curl "https://api.doujinshi.info/v1/book"
```

> Response example

```json
{
  "meta":{
    "total":344,
    "per_page":24,
    "current_page":1,
    "last_page":15,
    "next_page_url":"https://api.doujinshi.info/v1/book?page=2"
  },
  "data":[
    {
      "id":"LYAn4lRD9Glj",
      "name":{
        "japanese":"PM GALS!",
        "romaji":"PM GALS!",
        "english":""
      },
      "slug":"pm-gals",
      "date_released":"2004-08-15",
      "pages":64,
      "price":1300,
      "is_adult":true,
      "is_copybook":false,
      "is_anthology":false,
      "is_novel":false,
      "cover":"https://cdn.doujinshi.info/images/vhU2FmT3OPO9pr7Y45w0lv8g.jpg",
      "samples":[
        "https://cdn.doujinshi.info/images/pJVfO5SWs31BBy1dVP3Bbo31.jpg",
        "https://cdn.doujinshi.info/images/Xhuh4LBE3Q74CLRKkeWxWgNV.jpg"
      ],
      "created_at":"2017-01-30 02:17:41",
      "updated_at":"2017-01-30 02:17:41"
    }
    ...
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/book`

## Get Specific Doujinshi

Returns detailed information about a specific doujinshi.

> Request example

```shell
curl "https://api.doujinshi.info/v1/book/parm-special-02-in-nin-shugyou"
```
> Response example

```json
{
  "id":"OMbP6nM4jYBn",
  "name":{
    "japanese":"PSM・2淫忍修行",
    "romaji":"PSM2 In Nin Shugyou",
    "english":"ParM SpeciaL 02 Indecent Ninja Training"
  },
  "slug":"parm-special-02-in-nin-shugyou",
  "date_released":"2006-08-11",
  "pages":24,
  "price":858,
  "is_adult":true,
  "is_copybook":false,
  "is_anthology":false,
  "is_novel":false,
  "links":{
    "toranoana":"http://www.toranoana.jp/mailorder/article/04/0010/10/50/040010105014.html"
  },
  "cover":"https://cdn.doujinshi.info/images/rkKSl48FjbY5G6diUhu5trSn.jpg",
  "samples":[
    "https://cdn.doujinshi.info/images/Jb8i7Ls1l0QyJPpqcgI648Bm.jpg",
    "https://cdn.doujinshi.info/images/CFbba5HeKNu7M5MI2CnymIMX.jpg"
  ],
  "created_at":"2017-01-30 01:35:37",
  "updated_at":"2017-12-28 11:53:49",
  "tags":{
    "data":[
      {
        "id":"GA7D9Jdp4yXk",
        "type":{
          "id":"JYB3my24XqGN",
          "name":{
            "japanese":"芸術家",
            "romaji":"Geijutsuka",
            "english":"Artist"
          },
          "slug":"artist"
        },
        "name":{
          "japanese":"寿宴",
          "romaji":"Hisashi Utage",
          "english":null
        },
        "slug":"kotobuki-utage",
        "links":{
          "pixiv":"http://www.pixiv.net/member.php?id=862500",
          "homepage":"http://studioparm.com"
        },
        "created_at":"2017-01-29 09:09:43",
        "updated_at":"2017-01-29 09:09:43"
      },
      {
        "id":"DdpK9e7o45jo",
        "type":{
          "id":"lJyp4obm271L",
          "name":{
            "japanese":"サークル",
            "romaji":"Sakuru",
            "english":"Circle"
          },
          "slug":"circle"
        },
        "name":{
          "japanese":"Studio★ParM",
          "romaji":"StudioParM",
          "english":null
        },
        "slug":"studio-parm",
        "links":{
          "homepage":"http://studioparm.com"
        },
        "created_at":"2017-01-29 09:09:44",
        "updated_at":"2017-01-29 09:09:44"
      },
      {
        "id":"JYB3my1emXqG",
        "type":{
          "id":"oWYqmql9lJPj",
          "name":{
            "japanese":"シリーズ",
            "romaji":"Shirizu",
            "english":"Series"
          },
          "slug":"series"
        },
        "name":{
          "japanese":"NARUTO",
          "romaji":"NARUTO",
          "english":null
        },
        "slug":"naruto",
        "created_at":"2017-01-29 09:09:44",
        "updated_at":"2017-01-29 09:09:44"
      }
    ]
  }
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/book/{slug}`

## Get Doujinshi's Changelog

Returns a list of changes that have occurred to a specific doujinshi entry.

> Request example

```shell
curl "https://api.doujinshi.info/v1/book/parm-special-02-in-nin-shugyou/changelog"
```
> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"R8AZ4Go24vWw",
      "type":"update",
      "user":{
        "name":"Kisuka",
        "slug":"kisuka"
      },
      "book":{
        "id":"OMbP6nM4jYBn",
        "name":{
          "japanese":"PSM・2淫忍修行",
          "romaji":"PSM2 In Nin Shugyou",
          "english":"ParM SpeciaL 02 Indecent Ninja Training"
        },
        "slug":"parm-special-02-in-nin-shugyou",
        "date_released":"2006-08-11",
        "pages":24,
        "price":858,
        "is_adult":true,
        "is_copybook":false,
        "is_anthology":false,
        "is_novel":false,
        "created_at":"2017-01-30 01:35:37",
        "updated_at":"2018-07-28 07:40:34"
      },
      "tag":null,
      "transaction_id":"kQamKkDPmXg1",
      "amount":10,
      "created_at":"2018-07-28 07:40:34"
    }
    ...
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/book/{slug}/changelog`

## Create Doujinshi

Adds a doujinshi to the database.

> Request example

```shell
curl "https://api.doujinshi.info/v1/book" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDM5NzgzLCJleHAiOjE1MzYwNDA2ODMsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.mE3z8HLWR0ZAdKQqAssOifkMEbI5j9GkUZV9kV1Qc_s' \
  -H 'Content-Type: multipart/form-data; charset=utf-8' \
  -F 'name_japanese=PSM・2淫忍修行' \
  -F 'name_romaji=PSM2 In Nin Shugyou' \
  -F 'date_released=2018-09-03' \
  -F 'price=858' \
  -F 'is_adult=true' \
  -F 'cover=@/y/git/doujinshi/docs/dist/logo.png'
```

> Response example

```json
{
  "id":"3RVKmpnA6dLb",
  "name":{
    "japanese":"PSM・2淫忍修行",
    "romaji":"PSM2 In Nin Shugyou",
    "english":null
  },
  "slug":"psm2-in-nin-shugyou",
  "date_released":"2018-09-03",
  "pages":null,
  "price":"858",
  "is_adult":true,
  "is_copybook":false,
  "is_anthology":false,
  "is_novel":false,
  "created_at":"2018-09-03 21:12:38",
  "updated_at":"2018-09-03 21:12:38",
  "tags":{
    "data":[]
  },
  "cover":"https://cdn.doujinshi.info/images/2018-09-03/xqgCZX7Gsnp3cU-cover.jpg"
}
```

### HTTP Request

`POST https://api.doujinshi.info/v1/book`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| name_japanese | string | Required | The original Japanese title of the book. |
| name_romaji | string | Optional | The romanized version of the Japanese title. |
| name_english | string | Optional | Any popularized english translated title of the work. |
| date_released | string | Optional | The date the book was released. |
| pages | integer | Optional | The amount of pages contained in the book. |
| price | integer | Optional | The price of the book in Japanese Yen. |
| is_copybook | boolean | Optional | If the book is a copybook or not. |
| is_anthology | boolean | Optional | If the book is an anthology or not. |
| is_adult | boolean | Optional | If the book features 18+ content or not. |
| is_novel | boolean | Optional | If the book is a novel or not. |
| tags | array | Optional | The unique IDs of various tags associated with the work. Such as artists, circles, series, etc. |
| links | array | Optional | Links to Toranoana, Melon Books, and various places to purchase the work. |
| cover | image | Optional | An image of the cover art of the work. |
| samples | array | Optional | Sample pages from the work. |

## Update Doujinshi

Updates an existing doujinshi in the database. Passing either the `cover` or `samples` arguments will replace the current images.

> Request example

```shell
curl "https://api.doujinshi.info/v1/book/psm2-in-nin-shugyou" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ1MjIwLCJleHAiOjE1MzYwNDYxMjAsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.xg5Clb3RDzvH8ihzCVtb7dayrzt0ZFYr59j8MZKf1sQ' \
  -H 'Content-Type: multipart/form-data; charset=utf-8' \
  -F 'name_japanese=PSM・2淫忍修行' \
  -F 'name_romaji=PSM2 In Nin Shugyou' \
  -F 'date_released=2018-09-03' \
  -F 'price=858' \
  -F 'is_adult=true' \
  -F 'links[toranoana]=http://www.toranoana.jp/mailorder/article/04/0010/10/50/040010105014.html'
```

> Response example

```json
{
  "id":"3RVKmpnA6dLb",
  "name":{
    "japanese":"PSM・2淫忍修行",
    "romaji":"PSM2 In Nin Shugyou",
    "english":null
  },
  "slug":"psm2-in-nin-shugyou",
  "date_released":"2018-09-03",
  "pages":"24",
  "price":"858",
  "is_adult":true,
  "is_copybook":false,
  "is_anthology":false,
  "is_novel":false,
  "created_at":"2018-09-03 21:12:38",
  "updated_at":"2018-09-03 21:12:38",
  "tags":{
    "data":[]
  },
  "cover":"https://cdn.doujinshi.info/images/2018-09-03/xqgCZX7Gsnp3cU-cover.jpg",
  "links":{
    "toranoana":"http://www.toranoana.jp/mailorder/article/04/0010/10/50/040010105014.html"
  }
}
```

### HTTP Request

`PUT https://api.doujinshi.info/v1/import`

## Import Doujinshi

As a quick way of adding doujinshi objects to the database, a spider can be initialized to crawl a Toranoana or Melonbooks listing. Submitting a link to the import endpoint will queue up a crawling job. If the doujinshi already exists, it will not import it.

> Request example

```shell
curl "https://api.doujinshi.info/v1/import" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -H 'Content-Type: application/json' \
  -d '{
    "url":"https://www.melonbooks.co.jp/detail/detail.php?product_id=402515"
  }'
```
> Response example

```json
{"data":"import_success"}
```

### HTTP Request

`POST https://api.doujinshi.info/v1/import`

### Arguments

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| url | string | Required | The URL of the Toranoana or Melonbooks listing. |

# Changelog

## Get All Changes

Get a list of the recent changes to all tags and doujinshi in the databse.

> Request example

```shell
curl "https://api.doujinshi.info/v1/changelog"
```

> Response example

```json
{
  "meta":{
    "total":8,
    "per_page":"1",
    "current_page":1,
    "last_page":8,
    "next_page_url":"https://api.doujinshi.info/v1/changelog?page=2"
  },
  "data":[
    {
      "id":"R8AZ4Go24vWw",
      "type":"update",
      "user":{
        "name":"Kisuka",
        "slug":"kisuka"
      },
      "book":{
        "id":"OMbP6nM4jYBn",
        "name":{
          "japanese":"PSM・2淫忍修行",
          "romaji":"PSM2 In Nin Shugyou",
          "english":"ParM SpeciaL 02 Indecent Ninja Training"
        },
        "slug":"parm-special-02-in-nin-shugyou",
        "date_released":"2006-08-11",
        "pages":24,
        "price":858,
        "is_adult":true,
        "is_copybook":false,
        "is_anthology":false,
        "is_novel":false,
        "created_at":"2017-01-30 01:35:37",
        "updated_at":"2018-07-28 07:40:34"
      },
      "tag":null,
      "transaction_id":"kQamKkDPmXg1",
      "amount":10,
      "created_at":"2018-07-28 07:40:34"
    }
    ...
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/changelog`

## Get Specific Change

Returns a list of detailed differences of a specific changelog entry.

> Request example

```shell
curl "https://api.doujinshi.info/v1/changelog/R8AZ4Go24vWw"
```

> Response example

```json
{
  "id":"R8AZ4Go24vWw",
  "type":"update",
  "user":{
    "name":"Kisuka",
    "slug":"kisuka"
  },
  "book":{
    "id":"OMbP6nM4jYBn",
    "name":{
      "japanese":"PSM・2淫忍修行",
      "romaji":"PSM2 In Nin Shugyou",
      "english":"ParM SpeciaL 02 Indecent Ninja Training"
    },
    "slug":"parm-special-02-in-nin-shugyou",
    "date_released":"2006-08-11",
    "pages":24,
    "price":858,
    "is_adult":true,
    "is_copybook":false,
    "is_anthology":false,
    "is_novel":false,
    "created_at":"2017-01-30 01:35:37",
    "updated_at":"2018-07-28 07:40:34"
  },
  "tag":null,
  "transaction_id":"kQamKkDPmXg1",
  "amount":10,
  "created_at":"2018-07-28 07:40:34",
  "changelog":{
    "data":[
      {
        "type":"book",
        "column":"tag_id",
        "old_value":null,
        "new_value":{
          "id":"J5KBm85A4EPp",
          "type":{
            "id":"PBRN40y60nZQ",
            "name":{
              "japanese":"キャラクター",
              "romaji":"Kyarakuta",
              "english":"Character"
            },
            "slug":"character"
          },
          "name":{
            "japanese":"日向ヒナタ",
            "romaji":"Hyuuga hinata",
            "english":null
          },
          "slug":"hyuuga-hinata",
          "created_at":"2017-01-29 09:09:44",
          "updated_at":"2017-01-29 09:09:44"
        }
      },
      {
        "type":"book",
        "column":"tag_id",
        "old_value":null,
        "new_value":{
          "id":"PBRN40Pr40nZ",
          "type":{
            "id":"PBRN40y60nZQ",
            "name":{
              "japanese":"キャラクター",
              "romaji":"kyarakuta",
              "english":"Character"
            },
            "slug":"character"
          },
          "name":{
            "japanese":"犬塚キバ",
            "romaji":"Inutsuka kiba",
            "english":null
          },
          "slug":"inuzuka-kiba",
          "created_at":"2017-01-29 09:09:45",
          "updated_at":"2017-01-29 09:09:45"
        }
      },
      {
        "type":"book",
        "column":"tag_id",
        "old_value":null,
        "new_value":{
          "id":"OMbP6nVy6jYB",
          "type":{
            "id":"PBRN40y60nZQ",
            "name":{
              "japanese":"キャラクター",
              "romaji":"kyarakuta",
              "english":"Character"
            },
            "slug":"character"
          },
          "name":{
            "japanese":"赤丸",
            "romaji":"Akamaru",
            "english":null
          },
          "slug":"akamaru",
          "created_at":"2017-01-29 09:09:46",
          "updated_at":"2017-01-29 09:09:46"
        }
      }
    ]
  }
}

```

### HTTP Request

`GET https://api.doujinshi.info/v1/changelog/{id}`

# Search

## Search Doujinshi

Queries the entire database for doujinshi featuring the keywords specified. Query parameters can also be included to further filter the results.

> Request example

```shell
curl "https://api.doujinshi.info/v1/search?q=naruto"
```

> Response example

```json
{
   "meta":{
      "total":90,
      "per_page":24,
      "current_page":1,
      "last_page":4,
      "next_page_url":"https://api.doujinshi.info/v1/search?q=naruto&page=2"
   },
   "data":[
      {
         "id":"OMbP6nM4jYBn",
         "name":{
            "japanese":"PSM・2淫忍修行",
            "romaji":"PSM2 In Nin Shugyou",
            "english":"ParM SpeciaL 02 Indecent Ninja Training"
         },
         "slug":"parm-special-02-in-nin-shugyou",
         "date_released":"2006-08-11",
         "pages":24,
         "price":858,
         "is_adult":true,
         "is_copybook":false,
         "is_anthology":false,
         "is_novel":false,
         "created_at":"2017-01-30 01:35:37",
         "updated_at":"2018-08-25 03:18:08",
         "cover":"https://cdn.doujinshi.info/images/rkKSl48FjbY5G6diUhu5trSn.jpg"
      }
   ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/search`

### Query Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| q | string | Required | The search query |
| copybook | boolean | Optional | Filter if the results should contain only copybooks or not. |
| anthology | boolean | Optional | Filter if the results should contain only anthologies or not. |
| adult | boolean | Optional | Filter if the results should contain only 18+ content or not. |
| novel | boolean | Optional | Filter if the results should contain only novels or not. |

## Search Tags

Queries the database for tags featuring the specified keywords.

> Request example

```shell
curl "https://api.doujinshi.info/v1/search/tag/series?q=naruto"
```

> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"JYB3my1emXqG",
      "type":{
        "id":"oWYqmql9lJPj",
        "name":{
          "japanese":"シリーズ",
          "romaji":"Shirizu",
          "english":"Series"
        },
      "slug":"series"
      },
      "name":{
        "japanese":"NARUTO",
        "romaji":"NARUTO",
        "english":null
      },
      "slug":"naruto",
      "created_at":"2017-01-29 09:09:44",
      "updated_at":"2017-01-29 09:09:44",
      "tags":{
        "data":[]
      }
    }
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/search/tag/{type}`

### Query Parameters

| Parameter | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| q | string | Required | The search query |

## Reverse Image Search

# Users

## Get Specific User

Returns public information about a specific user.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/kisuka"
```

> Response example

```json
{
  "id":"RZe14xe6YAba",
  "name":"Kisuka",
  "slug":"kisuka",
  "collection":3,
  "wishlist":2,
  "estimated_cost":1639,
  "contributions":11,
  "created_at":"2017-01-30 01:21:26"
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/user/{slug}`

## Get User's Contributions

Returns a list of a user's contributions to the database such as new entries and modifications.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/kisuka/contributions"
```

> Response example

```json
{
  "meta":{
    "total":8,
    "per_page":"1",
    "current_page":1,
    "last_page":8,
    "next_page_url":"https://api.doujinshi.info/v1/user/kisuka/contributions?page=2"
  },
  "data":[
    {
      "id":"R8AZ4Go24vWw",
      "type":"update",
      "user":{
        "name":"Kisuka",
        "slug":"kisuka"
      },
      "book":{
        "id":"OMbP6nM4jYBn",
        "name":{
          "japanese":"PSM・2淫忍修行",
          "romaji":"PSM2 In Nin Shugyou",
          "english":"ParM SpeciaL 02 Indecent Ninja Training"
        },
        "slug":"parm-special-02-in-nin-shugyou",
        "date_released":"2006-08-11",
        "pages":24,
        "price":858,
        "is_adult":true,
        "is_copybook":false,
        "is_anthology":false,
        "is_novel":false,
        "created_at":"2017-01-30 01:35:37",
        "updated_at":"2018-07-28 07:40:34"
      },
      "tag":null,
      "transaction_id":"kQamKkDPmXg1",
      "amount":10,
      "created_at":"2018-07-28 07:40:34"
    }
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/user/{user}/contributions`

## Update Settings

# User Libraries

## Get User's Library

Returns a list of doujinshi within a user's `collection` or `wishlist`.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/kisuka/library/collection"
```

> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"lJyp4oPa6271",
      "name":{
        "japanese":"プラグスーツ・フェチ総集編",
        "romaji":"Puragusutsu Fechi Soushuuhen",
        "english":"Plug Suit Fetish Omnibus"
      },
      "slug":"puragusutsu-fechi-soushuuhen",
      "date_released":"2008-12-30",
      "pages":232,
      "price":1500,
      "is_adult":true,
      "is_copybook":false,
      "is_anthology":false,
      "is_novel":false,
      "cover":"https://cdn.doujinshi.info/images/tM3bjC3agcb8zbLHrjicAlJl.jpg",
      "samples":[
        "https://cdn.doujinshi.info/images/v6F6wDFZuGpwfW3Eg90aiaey.jpg",
        "https://cdn.doujinshi.info/images/8hh9xq9LX9BcgPPnvLGkod3v.jpg"
      ],
      "created_at":"2017-01-30 02:17:31",
      "updated_at":"2017-01-30 02:17:31"
    }
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/user/{user}/library/{type}`

## Check Library Entry

Checks if a specific book object is present within the authenticated user's library.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/library/collection/lJyp4oPa6271" \
  -X GET \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

### HTTP Request

`GET https://api.doujinshi.info/v1/library/{type}/{book}`

## Add Library Entry

Adds a book object to the user's library of choice.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/library/wishlist" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -d '{
    "book": "lJyp4oPa6271"
  }'
```

### HTTP Request

`POST https://api.doujinshi.info/v1/library/{type}`

## Remove Library Entry

Removes an existing book object from the user's library.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/library/wishlist" \
  -X DELETE \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -d '{
    "book": "lJyp4oPa6271"
  }'
```

### HTTP Request

`DELETE https://api.doujinshi.info/v1/library/{type}`

# Followed Tags

## Get User's Followed Tags

Gets a list of tags that the user is currently following.

> Request example

```shell
curl "https://api.doujinshi.info/v1/user/kisuka/following" \
  -X GET \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

> Response example

```json
{
  "meta":{
    "total":1,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"JYB3my1emXqG",
      "type":{
        "id":"oWYqmql9lJPj",
        "name":{
            "japanese":"シリーズ",
            "romaji":"shirizu",
            "english":"Series"
        },
        "slug":"series"
      },
      "name":{
        "japanese":"NARUTO",
        "romaji":"NARUTO",
        "english":null
      },
      "slug":"naruto",
      "created_at":"2017-01-29 09:09:44",
      "updated_at":"2017-01-29 09:09:44"
    }
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/user/{user}/following`

## Check Followed Tag

Checks if a user is currently following a tag or not.

> Request example

```shell
curl "https://api.doujinshi.info/v1/following/Jyp4oapa9271" \
  -X GET \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

> Response example

```json
{"data":true}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/following/{tag}`

## Follow Tag

Adds a tag to the user's followed tags list.

> Request example

```shell
curl "https://api.doujinshi.info/v1/following" \
  -X POST \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -d '{
    "tag": "Jyp4oapa9271"
  }'
```

### HTTP Request

`POST https://api.doujinshi.info/v1/following`

## Unfollow Tag

Unfollows a tag from a user's followed tags list.

> Request example

```shell
curl "https://api.doujinshi.info/v1/following" \
  -X DELETE \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -d '{
    "tag": "Jyp4oapa9271"
  }'
```

### HTTP Request

`DELETE https://api.doujinshi.info/v1/following`

# Notifications

## Get User's Notifications

Returns the authenticated user's notification list.

> Request example

```shell
curl "https://api.doujinshi.info/v1/notifications" \
  -X GET \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

> Response example

```json
{
  "meta":{
    "total":23,
    "per_page":24,
    "current_page":1,
    "last_page":1,
    "next_page_url":null
  },
  "data":[
    {
      "id":"Z3lAm5nJ4oyx",
      "type":"new_doujin",
      "user":{
          "name":"Kisuka",
          "slug":"kisuka"
      },
      "sender":null,
      "book":{
        "id":"qJKb6ak1mZGY",
        "name":{
          "japanese":"PSM・2淫忍修行",
          "romaji":"PSM2 In Nin Shugyou",
          "english":"ParM SpeciaL 02 Indecent Ninja Training"
        },
        "slug":"psm2-in-nin-shugyou",
        "date_released":"2018-08-13",
        "pages":null,
        "price":null,
        "is_adult":false,
        "is_copybook":false,
        "is_anthology":false,
        "is_novel":false,
        "created_at":"2018-08-13 03:14:32",
        "updated_at":"2018-08-13 03:14:32",
        "cover":"https://cdn.doujinshi.info/images/2018-09-03/xqgCZX7Gsnp3cU-cover.jpg"
      },
      "tag":{
        "id":"JYB3my1emXqG",
        "type":{
            "id":"oWYqmql9lJPj",
            "name":{
                "japanese":"シリーズ",
                "romaji":"shirizu",
                "english":"Series"
            },
            "slug":"series"
        },
        "name":{
            "japanese":"NARUTO",
            "romaji":"NARUTO",
            "english":null
        },
        "slug":"naruto",
        "created_at":"2017-01-29 09:09:44",
        "updated_at":"2017-01-29 09:09:44"
      },
      "is_read":true,
      "created_at":"2018-08-13 03:14:37"
    },
  ]
}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/notifications`

## Get Unread Count

Gets the amount of notifications which are currently unread by the user.

> Request example

```shell
curl "https://api.doujinshi.info/v1/notifications/count" \
  -X GET \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

> Response example

```json
{"data":0}
```

### HTTP Request

`GET https://api.doujinshi.info/v1/notifications/count`

## Mark Notification as Read

Changes the notification's unread status to read.

> Request example

```shell
curl "https://api.doujinshi.info/v1/notifications/read" \
  -X PUT \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw' \
  -d '{
    "notification": "Z3lAm5nJ4oyx"
  }'
```

> Response example

```json
{"data":true}
```

### HTTP Request

`PUT https://api.doujinshi.info/v1/notifications/read`

## Mark All as Read

Updates all of a user's notifications to a read status.

> Request example

```shell
curl "https://api.doujinshi.info/v1/notifications/read/all" \
  -X PUT \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZG91amluLmxvY2FsIiwiaWF0IjoxNTM2MDQ3NDY0LCJleHAiOjE1MzYwNDgzNjQsInN1YiI6IlJaZTE0eGU2WUFiYSIsIm5hbWUiOiJLaXN1a2EiLCJzbHVnIjoia2lzdWthMSIsImlzX2FkbWluIjp0cnVlLCJpc19tb2QiOmZhbHNlfQ.e2hVMIz0lLnyl8QPdmOASywjgEQb33xTvzrQGnGvigw'
```

> Response example

```json
{"data":true}
```

### HTTP Request

`PUT https://api.doujinshi.info/v1/notifications/read/all`