const express = require('express');
const router = express.Router();
const { generateInsights } = require('../controllers/aiController');

router.post('/generate', generateInsights);

module.exports = router;
