const express = require('express');
const router = express.Router();

const userContactHandler = require('../handler/userContactHandler');

/* Routes From '/contact' */
/* Upload User Contact */
router.post('/', userContactHandler.uploadContact);
/* Get user contact list*/
router.get('/:user_id', userContactHandler.getContactList);

module.exports = router;
