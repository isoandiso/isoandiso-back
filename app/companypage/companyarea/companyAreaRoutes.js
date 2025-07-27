const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const companyAreaController = require('./companyAreaController');

//RUTAS

//POSTS
router.post('/companyArea', verifyToken, companyAreaController.createCompanyArea);
router.post('/companyArea/addResponsibleEmployee/:areaId/:employeeId', verifyToken, companyAreaController.addResponsibleEmployee);

//PUTS
router.put('/companyArea/addIso/:areaId/:isoId', verifyToken, companyAreaController.addIso);

//GETS
router.get('/companyArea', verifyToken, companyAreaController.getAllCompanyAreas);
router.get('/companyArea/:areaId', verifyToken, companyAreaController.getCompanyArea);
router.get('/companyArea/getChargeOfHigherHierarchyOfArea/:areaId', verifyToken, companyAreaController.getChargeOfHigherHierarchyOfArea);

//DELETES
router.delete('/companyArea/:areaId', verifyToken, companyAreaController.deleteCompanyArea);
router.delete('/companyArea/deleteIsos/:areaId', verifyToken, companyAreaController.deleteIsos);
router.delete('/companyArea/deleteEmployee/:areaId', verifyToken, companyAreaController.deleteEmployee);

module.exports = router;
