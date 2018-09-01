const express = require('express');
const router = express.Router();

const userContactHandler = require('../handler/userContactHandler');

/* Routes From '/contact' */
/* Upload User Contact */
router.post('/', userContactHandler.uploadContact);

module.exports = router;
