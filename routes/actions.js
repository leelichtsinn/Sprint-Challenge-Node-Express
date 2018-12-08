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
  if (action.project_id && (action.description.length <= 128) && action.notes) {
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
});

// PUT /api/actions/update/:id
router.put('/update/:id', (req, res) => {
  const action = req.body;
  const { id } = req.params;
  actionsDb
    .update(id, action)
    .then(count => {
      actionsDb
        .get(id)
        .then(action => {
          res
            .status(201)
            .json(action);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'action information could not be modified' });
    });
});

// DELETE /api actions/delete/:id
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  actionsDb
    .remove(id)
    .then(count => {
      if (count) {
        res
          .status(201)
          .json({ message: 'action successfully deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'the action with the specified id does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'action could not be deleted' });
    });
});

module.exports = router;
