const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const userController = require('./userController');

//RUTAS

//POSTS
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.post('/user/logout', verifyToken, userController.logout);

//PUTS
router.put('/user/:userId', verifyToken, userController.updateUser);

//GETS
router.get('/user/profile', verifyToken, userController.profile);
router.get('/user', verifyToken, userController.getAllUsers);
router.get('/user/:userId', verifyToken, userController.getUser);

//DELETES
router.delete('/user/:userId', verifyToken, userController.deleteUser);


module.exports = router;