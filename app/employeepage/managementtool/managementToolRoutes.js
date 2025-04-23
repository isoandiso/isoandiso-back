const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const managementToolController = require('./managementToolController');

//RUTAS

//POSTS
router.post('/managementTool', verifyToken, managementToolController.createManagementTool);

//PUTS

//GETS
router.get('/managementTool', verifyToken, managementToolController.getAllManagementTools);
router.get('/managementTool/:managementToolId', verifyToken, managementToolController.getManagementTool);

//DELETES
router.delete('/managementTool/:managementToolId', verifyToken, managementToolController.deleteManagementTool);


module.exports = router;