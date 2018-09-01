const express = require('express');
const router = express.Router();

const userZoneHandler = require('../handler/userZoneHandler');

/* Routes From '/zone' */
/* Set use's zone */
router.post('/', userZoneHandler.setZone);

module.exports = router;
