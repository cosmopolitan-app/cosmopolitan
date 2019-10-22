![Cosmopolitan-logo](/resources/assets/public/cosmopolitan-logo-full.png)

## Build Setup

You need docker!

``` bash
# Setup basic configuration
$ cp .env.example .env

# Install Adonis CLI (if you don't have already)
$ npm install --global @adonisjs/cli

# Create a docker container with the database
$ make init-db

# install dependencies
$ npm i

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).