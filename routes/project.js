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

module.exports = router;
