const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//CONTROLADOR
const companyAreaController = require('./companyAreaController');

//RUTAS

//POSTS
router.post('/companyArea', verifyToken, companyAreaController.createCompanyArea);

//PUTS
router.put('/companyArea/addIso/:areaId/:isoId', verifyToken, companyAreaController.addIso);
router.put('/companyArea/addResponsibleEmployee/:areaId/:companyId/:employeeId/:employeeEmail', verifyToken, companyAreaController.addResponsibleEmployee);

//GETS
router.get('/companyArea', verifyToken, companyAreaController.getAllCompanyAreas);
router.get('/companyArea/:areaId', verifyToken, companyAreaController.getCompanyArea);
router.get('/companyArea/getChargeOfHigherHierarchyOfArea/:areaId', verifyToken, companyAreaController.getChargeOfHigherHierarchyOfArea);

//DELETES
router.delete('/companyArea/:areaId/:companyId', verifyToken, companyAreaController.deleteCompanyArea);
router.delete('/companyArea/deleteIsos/:areaId', verifyToken, companyAreaController.deleteIsos);
router.delete('/companyArea/deleteEmploye/:areaId/:companyId/:employeeId/:employeeEmail', verifyToken, companyAreaController.deleteEmployee);

module.exports = router;
