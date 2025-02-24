const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const subcompanyWorkerController = require('./subcompanyWorkerController');

//RUTAS
router.post('/subcompanyWorker', verifyToken, subcompanyWorkerController.createSubcompanyWorker);
router.get('/subcompanyWorker', verifyToken, subcompanyWorkerController.getAllSubcompanyWorkers);
router.get('/subcompanyWorker/:id', verifyToken, subcompanyWorkerController.getSubcompanyWorker);
router.delete('/subcompanyWorker/:id', verifyToken, subcompanyWorkerController.deleteSubcompanyWorker);

module.exports = router;