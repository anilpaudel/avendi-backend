# Avendi Backend

The repository contains source code for avendi hotel platform backend.


## Built With

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/en/docs/install)
* [Git](https://git-scm.com/downloads)
* [MongoDB](https://www.mongodb.com/try/download/community)

## Authors

* **Ashish Belwase** - *Lead Developer* - [belwase](https://github.com/belwase)


### Usage

##### 1. Clone the repository and install dependencies.

```sh
$ yarn
```

##### 2. Copy `.env.example` as `.env` file inside your root directory. Update the environment variables based on stage.

```sh
$ cp .env.example .env
```

##### 3. Run the development server using the command

```sh
$ yarn start:dev
```

##### 4. Run the production server using the command

```sh
$ NODE_ENV=production node app.js
```
