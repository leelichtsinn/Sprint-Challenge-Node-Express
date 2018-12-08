const express = require('express');
const projectsDb = require('../data/helpers/projectModel');

const router = express.Router();

// GET /api/projects
router.get('/', (req, res) => {
  projectsDb
    .get()
    .then(project => {
      res
        .send(project);
    })
    .catch(err => {
      res
        .json({ message: 'unable to get projects' });
    });
});

// GET /api/projects/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectsDb
    .get(id)
    .then(project => {
      res
        .send(project);
    })
    .catch(err => {
      res
        .json({ message: 'unable to get projects' });
    });
});

// POST /api/projects/create
router.post('/create', (req, res) => {
  const project = req.body;
  if (project.name && project.description) {
    projectsDb
      .insert(project)
      .then(idInfo => {
        projectsDb
          .get(idInfo.id)
          .then(project => {
            res
              .status(201)
              .json(idInfo);
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'failed to insert projcet into db' });
      })
  } else {
    res
    .status(400)
    .json({ errorMessage: 'please provide a name and description for the project' });
  }
});

module.exports = router;
