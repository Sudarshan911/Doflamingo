const Router = require('express').Router();
const { login } = require('../service/auth');

Router.get('/login', login);

module.exports = Router;
