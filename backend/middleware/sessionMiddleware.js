const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.URI,
    ttl: 1800,
  }),
});

async function initIsLoggedIn(req, res, next) {
  if (!req.session.hasOwnProperty('isLoggedIn')) {
    req.session.isLoggedIn = false;
  }
  
  next();
}

module.exports = {sessionMiddleware, initIsLoggedIn};