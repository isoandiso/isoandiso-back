const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const managementToolController = require('./managementToolController');

//RUTAS
router.post('/managementTool', verifyToken, managementToolController.createManagementTool);
router.get('/managementTool', verifyToken, managementToolController.getAllManagementTools);
router.get('/managementTool/:id', verifyToken, managementToolController.getManagementTool);
router.delete('/managementTool/:id', verifyToken, managementToolController.deleteManagementTool);

module.exports = router;