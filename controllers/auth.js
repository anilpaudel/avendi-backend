/**
 * @overview
 * Authentication Controller
 *
 * This controller is responsible for managing user authentication and
 * authorization to the entire application stack.

 */

const _ = require('lodash');
//const q = require('q');
const db = require('../lib/db');
const Unauthorized = require('../lib/errors/Unauthorized');

// POST /auth/login
exports.login = loginRoute;

function loginRoute(req, res, next) {
  const { username, password } = req.body;
  login(username, password)
    .then(session => {
      // bind the session variables
      _.merge(req.session, session);

      // send the session data back to the client
      res.status(200).json(session);
    })
    .catch(next);
}

async function login(username, password) {
  return {}
}
