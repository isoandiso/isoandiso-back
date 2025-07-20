const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const userService = require('./userService');

//RUTAS

//POSTS
router.post('/user/register', userService.register);
router.post('/user/login', userService.login);
router.post('/user/logout', verifyToken, userService.logout);

//PUTS
router.put('/user/:userId', verifyToken, userService.updateUser);

//GETS
router.get('/user/profile', verifyToken, userService.profile);
router.get('/user', verifyToken, userService.getAllUsers);
router.get('/user/:userId', verifyToken, userService.getUser);

//DELETES
router.delete('/user/:userId', verifyToken, userService.deleteUser);


module.exports = router;