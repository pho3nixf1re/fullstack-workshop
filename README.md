
# Full-stack Workshop

This is the example code used to teach basic REST API development and how to
consume them in a client application.

## Goal

To introduce HTTP REST API development principles using a Node.js server and
front end to consume the API.

## How to Run

First the dependencies must be installed.

```sh
npm install

# or with Yarn
yarn
```

### Server

To start the server use the following commands. When changes are made to the
server code it should automatically restart. See the console output for errors
or other notices.

```sh
npm run start:server

# Yarn
yarn start:server
```

### Client

When the client is ran it uses a development only node server
([`webpack-dev-server`](https://www.npmjs.com/package/webpack-dev-server)). Like
the server it reloads the code when it changes and either refreshes the page or
hot loads the new code live. All of the static assets are served directly from
memory and no actual build files are saved to disk.

```sh
npm run start:client

# Yarn
yarn start:client
```

### Running the Tests

There are tests for both the client and server. To run them use the following
commands. Note that they are similar to the `start` commands.

```sh
npm run test:server
npm run test:client

# Yarn
yarn test:server
yarn test:client
```

The tests are ran using the [AVA](https://github.com/avajs/ava) test runner.

## Notes

### Postman

Included is a [Postman](https://www.getpostman.com/) collection. This will help
working with the API to test the REST endpoints. Just import the included
collection into the Postman app.

### Tools and Frameworks

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (package manager, you can also use
  [Yarn](https://yarnpkg.com/))
- [ESLint](http://eslint.org/) (code style and linting)
- [Webpack](https://webpack.js.org/) (creates a client bundle, aka "the build")
- [React.js](https://facebook.github.io/react/) (UI component library)
- [BabelJS](https://babeljs.io/) (transforms JS to support new syntaxes)
- [FreezerJS](https://github.com/arqex/freezer) (holds UI state)
- [KOA](http://koajs.com/) ([version 2, aka 'next'](https://github.com/koajs/koa/blob/v2.x);
  the server library)
- [LokiJS](http://lokijs.org/) (lightweight database with MongoDB query
  interface)
- [AVA](https://github.com/avajs/ava) (test runner)
- [SuperTest](https://github.com/visionmedia/supertest) (sends test requests to
  the server, based on [SuperAgent](https://github.com/visionmedia/superagent))

### Required Documentation

- [KOA Router API](https://github.com/alexmingoia/koa-router)
- [LokiJS Collection API](https://rawgit.com/techfort/LokiJS/master/jsdoc/Collection.html)
- [LokiJS Query Examples](https://github.com/techfort/LokiJS/wiki/Query-Examples)
- [ReactJS Docs](https://facebook.github.io/react/docs/components-and-props.html)
- [FreezerJS Docs]([FreezerJS](https://github.com/arqex/freezer))
- [Native Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

### Helpful Resources

REST Methods: http://www.restapitutorial.com/lessons/httpmethods.html
