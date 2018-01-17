# Hackersplit API
> Hackersplit HTTP API used for processing and caching Hacker News articles and comments.  
> Used by [Hackersplit](https://github.com/nunofmn/hackersplit) application.

## Installing / Getting started
It’s necessary to get a [Mercury Web Parser](https://mercury.postlight.com/web-parser/) API token.

It’s recommended to start the application using Docker.

```shell
echo "MERCURY_API_TOKEN=token" > api.env
docker-compose up
```

## Features
### API endpoints
* **GET** /api
* **GET** _api_comment/{id}
* **GET** _api_comment/subcomments
* **GET** _api_story/{id}
* **GET** _api_story_{id}_comments
* **GET** _api_story_{id}_content
* **GET** _api_topstories

## Todo
- [ ] Add tests.
- [ ] Update code to use async.

## Contributing
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing
The code in this project is licensed under MIT license.
