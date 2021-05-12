# SmashUp Team Creator

---

## Installation

> npm install

### Firebase Settings

**Add the Firebase Config file with your config settings:**

> services/fb-config.js

**Content**

> const config = {\
>  apiKey: "<-- API KEY -->",\
>  authDomain: "<-- AUTH DOMAIN -->",\
> databaseURL: "<-- DATABASE URL -->",\
> projectId: "<-- PROJECT ID -->",\
> storageBucket: "<-- STORAGE BUCKET -->",\
> messagingSenderId: "<-- MESSAGING SENDER ID -->",\
> appId: "<-- APP ID -->",\
> }\
> module.exports = config

**Add the Firebase Collection file with your collection name:**

> services/fb-collection.js

**Content**

> const fbCollection = "<-- NAME OF COLLECTION -->"\
> module.exports = fbCollection

### Development

> gatsby develop

### Production

> gatsby build

OR

> gatsby build --prefix-paths

Set pathPrefix in **gatsby-config.js** for subdomain installation

> gatsby serve --prefix-paths

To view build on localhost:9000. Be sure to add your path if you are building with prefix-paths.
