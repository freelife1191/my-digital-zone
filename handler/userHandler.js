'use strict';

const Promise = require('bluebird');

const User = require('../models').models.User;

exports.updateToken = function (req, res) {

  User.update({
      client_token : req.body.client_token
    },
    {
      where: { email : req.body.email }
    })
    .then(function(result) {
      console.log(result);
      return User.findOne({
        where: { email: req.body.email }
      });
    })
    .then(function() {
      res.status(200).send();
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send();
    });
};


exports.getToken = function (req, res) {
  const query = {
    where: { email : req.body.email },
  };

  User.findOne(query)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send();
    });
};