const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const projectsDb = require('./data/helpers/projectModel');
const actionsDb = require('./data/helpers/actionModel');

const projectsRoute = require('./routes/project');
const actionsRoute = require('./routes/actions');

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(helmet());
app.use(logger('dev'));

// routes
app.use('/api/projects', projectsRoute);
app.use('/api/actions', actionsRoute);

app.get('/', (req, res) => {
  res.json({ message: 'app is running' });
});

app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
