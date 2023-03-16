const express = require('express');
const router = express.Router();
const User = require('../../../database/models/user');

router.get('/', (req, res) => {
  res.send('User route');
});

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;