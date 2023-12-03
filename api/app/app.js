const express = require('express');

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
  console.log(req.body);
  res.status(201).json({
    message: 'User creaded !'
  });
});

// GET


module.exports = app;