const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

module.exports = (database) => {
  router.get('/', (req, res) => userController.getUsers(req, res, database));
  router.post('/', (req, res) => userController.createUser(req, res, database));
  router.put('/:id', (req, res) => userController.updateUser(req, res, database));
  router.delete('/:id', (req, res) => userController.deleteUser(req, res, database));
  router.get('/email/:email', (req, res) => userController.getUserByEmail(req, res, database));

  return router;
};