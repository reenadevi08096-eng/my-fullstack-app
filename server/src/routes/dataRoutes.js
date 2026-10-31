const express = require('express');
const router = express.Router();
const { createEnrichedItem, getItems } = require('../controllers/dataController');

router.route('/').get(getItems).post(createEnrichedItem);

module.exports = router;
