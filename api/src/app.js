const express = require('express');
const helper = require('./helpers/hRouter');
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
  let user = req.body;
  let requiredParameterNumber = 9;
  
  helper.checkRequest(user, requiredParameterNumber, (valide) => {
    if(!valide) {
      return res.status(400).json({'error': 'Missing parameter.'})
    }
    usersController.createUser(user, (err) => {
      if(err) {
        return res.status(500).json({ 'error': 'Faild to create user. ' + err });
      }
      return res.status(201).json({ 'message': 'User created.'});
    });
  });
});

app.post('/api/user/sing-up', (req, res) => {
  let user = req.body;
  let requiredParameterNumber = 2;
  
  helper.checkRequest(user, requiredParameterNumber, (valide) => {
    if(!valide) {
      return res.status(400).json({'error': 'Missing parameter.'});
    }
    usersController.auth(user, (uid) => {
      if(!uid) {
        res.status(401).json({ 'message': 'Authentifiaction faild. Bad password or user name.'});
      }
      helper.createSession(uid, user.password, (session) => {
        return res.status(200).json(session);
      });
    })
  });
});


module.exports = app;