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

// POST /api/actions/create
router.post('/create', (req, res) => {
  const action = req.body;
  if (action.project_id && action.description && action.notes) {
    actionsDb
      .insert(action)
      .then(idInfo => {
        actionsDb
          .get(idInfo.id)
          .then(acton => {
            res
              .status(201)
              .json(idInfo);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'failed to insert action into db '});
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'please provide a description and notes for the action' });
  }
})

// PUT /api/actions/update/:id

// DELETE /api actions/delete/:id


module.exports = router;
