const express = require('express');
const actionsDb = require('../data/helpers/actionModel');

const router = express.Router();

// GET /api/actions
router.get('/', (req, res) => {
  actionsDb
    .get()
    .then(action => {
      res
        .status(200)
        .json(action);
    })
    .catch(err => {
      res
        .json({ message: 'unable to get actions' });
    });
});

// GET /api/actions/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionsDb
    .get(id)
    .then(action => {
      res
        .status(200)
        .json(action);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'unable to get action' });
    })
});


module.exports = router;
