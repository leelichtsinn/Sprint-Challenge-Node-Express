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

// GET /api/projects/:id/actions
router.get('/:projectId/actions', (req, res) => {
  const { projectId } = req.params;
  projectsDb
    .getProjectActions(projectId)
    .then(actions => {
      res
        .status(201)
        .send(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'unable to get project actions' });
    });
});

// POST /api/projects/create
router.post('/create', (req, res) => {
  const project = req.body;
  if ((project.name.length <= 128) && project.description) {
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

// UPDATE /api/projects/update
router.put('/update/:id', (req, res) => {
  const project = req.body;
  const { id } = req.params;
  projectsDb
    .update(id, project)
      .then(count => {
        projectsDb
          .get(id)
            .then(project => {
              res
                .status(201)
                .json(project);
            });
      })
      .catch(err => {
        res.status(500).json({ message: 'project information could not be modified'});
      });
});

// DELETE /api/projects/delete/:id
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  projectsDb
    .remove(id)
    .then(count => {
      if (count) {
        res
          .json({ message: 'project successfully deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'the project with the specified id does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'project could not be deleted' });
    });
});


module.exports = router;
