const express = require('express');
const actionsDb = require('../data/helpers/actionModel');

const router = express.Router();

// GET /api/actions
router.get('/', (req, res) => {
  res.json({ message: 'actions route is running' });
});

module.exports = router;
