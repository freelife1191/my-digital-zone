const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/login', isNotLoggedIn, (req, res, next) => {
  console.log('req.body : ',req.body);
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.status(400).end();
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.status(400).end();
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return res.status(400).end();
      }
      console.log('로그인 성공');
      console.log(user.dataValues);
      return res.status(200).json(user.dataValues);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
