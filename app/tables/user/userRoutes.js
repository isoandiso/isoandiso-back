const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const userController = require('./userController');

//RUTAS
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/logout', verifyToken, userController.logout);
router.get('/user/profile', verifyToken, userController.profile);
router.get('/user', verifyToken, userController.getAllUsers);
router.get('/user/:id', verifyToken, userController.getUser);
router.put('/user/:id', verifyToken, userController.getUserupdateUser);
router.delete('/user/:id', verifyToken, userController.deleteUser);

module.exports = router;