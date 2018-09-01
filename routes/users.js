var express = require('express');
var router = express.Router();
const userHandler = require('../handler/userHandler');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/', userHandler.updateToken);

module.exports = router;
