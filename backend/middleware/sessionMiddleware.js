const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionMiddleware = session({
  secret: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.URI,
    ttl: 14 * 24 * 60 * 60,
  }),
});

async function initIsLoggedIn(req, res, next) {
  if(!req.session.isLoggedIn) {
    req.session.isLoggedIn = false;
  } 

  next();
}

module.exports = {sessionMiddleware, initIsLoggedIn};