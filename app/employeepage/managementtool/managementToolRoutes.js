const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const managementToolService = require('./managementToolService');

//RUTAS

//POSTS
router.post('/managementTool', verifyToken, managementToolService.createManagementTool);

//PUTS

//GETS
router.get('/managementTool', verifyToken, managementToolService.getAllManagementTools);
router.get('/managementTool/:managementToolId', verifyToken, managementToolService.getManagementTool);

//DELETES
router.delete('/managementTool/:managementToolId', verifyToken, managementToolService.deleteManagementTool);


module.exports = router;