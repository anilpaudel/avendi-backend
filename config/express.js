/**
 * @overview
 * The application's middleware configuration.
 *
 */

const _ = require('lodash');
const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('app');
const debugHTTP = require('debug')('http');
const { Unauthorized } = require('../lib/errors');
const bodyParser = require('body-parser');

const bodyParserErrorHandler = require('../middleware/errorHandler').bodyParser;

const publicRoutes = ['/api/auth/login'];

// accept generic express instances (initialised in app.js)
exports.configure = function configure(app) {
  // TODO - things don't work well yet.
  // const isProduction = (process.env.NODE_ENV === 'production');
  const isProduction = false;

  debug('configuring middleware.');

  app.use(bodyParser.json({ limit: '8mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParserErrorHandler)

  // provide a stream for morgan to write to
  const stream = {
    write: (message) => debugHTTP(message.trim()),
  };

  // http logger setup
  // options: combined | common | dev | short | tiny
  app.use(morgan('short', { stream }));

  /**
   * @function overrideIndexCacheHeaders
   *
   * @description
   * Prevents the browser from caching index.html so that we don't have to tell our clients
   * to clear their cache every system upgrade. All other pages can be cached as normal.
   */
  function overrideIndexCacheHeaders(res, path) {
    const isIndexPage = path.includes('client/index.html');
    if (isIndexPage) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }

  //app.use(express.static('client/', { setHeaders : overrideIndexCacheHeaders }));
  //app.use(`/${uploads.directory}`, express.static(uploads.directory));

  // quick way to find out if a value is in an array
  function within(value, array) {
    return array.includes(value.trim());
  }

  // Only allow routes to use /login, /projects, /logout, and /languages if a
  // user session does not exists
  // app.use((req, res, next) => {
  //   if (_.isUndefined(req.user) && !within(req.path, publicRoutes)) {
  //     console.log(`Rejecting unauthorized access to ${req.path} from ${req.ip}`);
  //     //next(new Unauthorized('You are not logged into the system.'));
  //     res.status(401).json({error:'You are not logged into the system.'})
  //   } else {
  //     next();
  //   }
  // });
};
