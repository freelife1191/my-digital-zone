const express = require('express');
const router = express.Router();

const userZoneHandler = require('../handler/userZoneHandler');

/* Routes From '/zone' */
/* Set user's zone */
router.post('/', userZoneHandler.setZone);
/* Get user's zone list */
router.get('/:user_id', userZoneHandler.getZoneList);

module.exports = router;
