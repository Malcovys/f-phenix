const express = require('express');
const usersController = require('./controllers/users');

const app = express();

app.use(express.json());

// Cross origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// POST
app.post('/api/user/new', (req, res) => {
  if (Object.keys(req.body).length > 0) {
    stautsCode = usersController.createUser(req.body);
  }

  res.status(stautsCode);
});

// GET


module.exports = app;