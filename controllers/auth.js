/**
 * @overview
 * Authentication Controller
 *
 * This controller is responsible for managing user authentication and
 * authorization to the entire application stack.

 */

const _ = require('lodash');
const HttpStatus = require('http-status-codes');

const userService = require('../services/user');
const authService = require('../services/auth');

const AuthenticationError = require('../lib/errors/authentication');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticate(email, password);

    const data = await authService.generateAccessAndRefreshTokens(user);

    res.status(HttpStatus.OK).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req,res,next) => {
  try{
    const { refreshToken } = req.body;
    console.log(refreshToken)
    const data = await authService.refreshToken(refreshToken);

    res.status(HttpStatus.OK).json({ data });
  }catch(err){
    next(err)
  }
}