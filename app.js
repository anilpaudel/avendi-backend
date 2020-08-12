/**
 * @overview server
 * Avendi Backend Management
 *

 * @requires http
 * @requires dotenv
 * @requires express
 * @requires debug
 *
 * @requires config/express
 * @requires config/routes
 */

require('use-strict');
const dotEnv = require('dotenv');

configureEnvironmentVariables();

const http = require('http');
const express = require('express');
const debug = require('debug')('app');

const app = express();

/**
 * @function configureEnvironmentVariables
 *
 * @description
 * Uses dotenv to add environmental variables from the .env.* file to the
 * process object.  If the NODE_ENV system variable is not set, the function
 * defaults to 'dev' else set 'production'
 */
function configureEnvironmentVariables() {
  // if the process NODE_ENV is not set, default to dev.
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

  // normalize the environmental variable name
  const env = process.env.NODE_ENV.toLowerCase();

  // decode the file path for the environmental variables.
  const dotfile = `server/.env.${env}`.trim();

  // load the environmental variables into process using the dotenv module
  dotEnv.config({ path : dotfile });
}

/**
 * @function configureServer
 *
 * @description
 * Set up the HTTP server to listen on the correct
 */
function configureServer() {
  // destruct the environmental variables
  const port = process.env.PORT || 3000;
  const mode = process.env.NODE_ENV;

  // create the server
  http.createServer(app)
    .listen(port, () => {
      console.log(`configureServer(): Server started in mode ${mode} on port ${port}.`);
    });
}

// run configuration tools
configureServer();

// db
require('./config/database');

// Configure application middleware stack, inject authentication session
require('./config/express').configure(app);

// Link routes
var router = express.Router();
require('./config/routes').configure(router);
app.use('/api', router);

// ensure the process terminates gracefully when an error occurs.
process.on('uncaughtException', (e) => {
  debug('process.onUncaughException: %o', e);
  process.exit(1);
});

// crash on unhandled promise rejections
process.on('unhandledRejection', (e) => {
  debug('process.onUnhandledRejection: %o', e);
  process.exit(1);
});

process.on('warning', (warning) => {
  debug('process.onWarning: %o', warning);
});

module.exports = app;
