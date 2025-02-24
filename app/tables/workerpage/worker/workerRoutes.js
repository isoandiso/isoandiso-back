const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const workerController = require('./workerController');

//RUTAS
router.post('/worker/register', workerController.register);
router.post('/worker/login', workerController.login);
router.post('/worker/logout', verifyToken, workerController.logout);
router.get('/worker/profile', verifyToken, workerController.profile);
router.get('/worker/', verifyToken, workerController.getAllCompanyWorkers);
router.get('/worker/:id', verifyToken, workerController.getCompanyWorker);
router.get('/worker/getCompanyWorkerByEmail', verifyToken, workerController.getCompanyWorkerByEmail);
router.put('/worker/:id', verifyToken, workerController.updateCompanyWorker);
router.delete('/worker/:id', verifyToken, workerController.deleteCompanyWorker);

module.exports = router;