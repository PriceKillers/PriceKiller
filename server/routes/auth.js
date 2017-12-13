const express = require('express');
const session = require('express-session');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const db = require('../../db/index.js');

const createSession = (req, res, newUser) => {
  return req.session.regenerate((err) => {
    if (err) throw err;
  })
}

const checkUser = (user, cb) => {
  db.User.findOne({ username: user.username }, (err, user) => {
    if (user) {
      cb(false);
    } else {
      cb(true);
    }
  });
}

router.post('/signup', (req, res, next) => {
  console.log('user req', req.sessionID);
  // console.log('user res', res);
  //check if user exists
  db.checkUser(req.body.username, (err, user) => {
    if (err) {console.log('Route signup find user error', err);}
    //if user doesn't exist, hash password, store it, send message
    if (!user) {
      // createSession(req, res, req.body.username);
      // req.session.regenerate((err) => {
        // if (err) throw err;
        db.saveNewUser(req.body, () => {res.send(req.body.username)})

      // })
      // res.status(200).send('server received users post req', req.body.username);
    } else {
      //if it does, send message
      res.send('username exists');
    }
  })
});

router.get('/signup', (req, res, next) => {
  res.json('singup')
});


router.post('/login', (req, res, next) => {
  db.checkUser(req.body.username, (err, user) => {
    if (err) {console.log('Route login find user error', err);}
    //if user doesn't exist, hash password, store it, send message
     db.User.findOne({username: req.body.username}, function(err2, user) {
      if (err2) {console.log('login lookup user error', err2);}
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.regenerate((err) => {
            if (err) throw err;
            res.send('log in success!');
          })
        } else {
          console.log('Wrong password');
          res.send('login failed');
          res.end();
        }
      }
    });
  })
});


router.get('/login', (req, res, next) => {
  res.json('login')
});


module.exports.auth = router;