const express = require('express');
const router = express.Router();

//MIDDLEWARE
const { verifyToken } = require('../../token');

//SERVICIO
const companyAreaService = require('./companyAreaService');

//RUTAS

//POSTS
router.post('/companyArea', verifyToken, companyAreaService.createCompanyArea);

//PUTS
router.put('/companyArea/addIso/:areaId/:isoId', verifyToken, companyAreaService.addIso);
router.put('/companyArea/addResponsibleEmployee/:areaId/:employeeId', verifyToken, companyAreaService.addResponsibleEmployee);

//GETS
router.get('/companyArea', verifyToken, companyAreaService.getAllCompanyAreas);
router.get('/companyArea/:areaId', verifyToken, companyAreaService.getCompanyArea);
router.get('/companyArea/getChargeOfHigherHierarchyOfArea/:areaId', verifyToken, companyAreaService.getChargeOfHigherHierarchyOfArea);

//DELETES
router.delete('/companyArea/:areaId', verifyToken, companyAreaService.deleteCompanyArea);
router.delete('/companyArea/deleteIsos/:areaId', verifyToken, companyAreaService.deleteIsos);
router.delete('/companyArea/deleteEmployee/:areaId/:employeeId', verifyToken, companyAreaService.deleteEmployee);

module.exports = router;
