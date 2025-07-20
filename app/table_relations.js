/**
 * ARCHIVO CENTRALIZADO DE RELACIONES ENTRE TABLAS
 * 
 * Este archivo contiene todas las asociaciones entre los modelos de Sequelize
 * para evitar dependencias circulares y mantener un control centralizado.
 * 
 */

// Importar todos los modelos
const Company = require('./companypage/company/companySchema');
const CompanyCountry = require('./companypage/companycountry/companyCountrySchema');
const CompanyAcquisition = require('./companypage/companyacquisition/companyAcquisitionSchema');
const CompanyAcquisitionType = require('./companypage/companyacquisitiontype/companyAcquisitionTypeSchema');
const CompanySite = require('./companypage/companysite/companySiteSchema');
const CompanyArea = require('./companypage/companyarea/companyAreaSchema');
const Iso = require('./companypage/iso/isoSchema');
const Employee = require('./employeepage/employee/employeeSchema');
const EmployeeNationality = require('./employeepage/employeenationality/employeeNationalitySchema');
const GeneralObjective = require('./employeepage/generalobjective/generalObjectiveSchema');
const ManagementTool = require('./employeepage/managementtool/managementToolSchema');
const Rol = require('./employeepage/rol/rolSchema');
const SpecificObjective = require('./employeepage/specificobjective/specificObjectiveSchema');
const Subcompany = require('./employeepage/subcompany/subcompanySchema');
const SubcompanyEmployee = require('./employeepage/subcompanyemployee/subcompanyEmployeeSchema');
const Activity = require('./employeepage/activity/activitySchema');
const User = require('./partnerpage/user/userSchema');
const EmployeeCompanyRegistry = require('./employeecompanyregistry/employeeCompanyRegistrySchema');

/**
 * FUNCIÓN PARA DEFINIR TODAS LAS RELACIONES
 */
const defineRelations = () => {

  // ========================================
  // RELACIONES DEL MÓDULO COMPANY
  // ========================================

  // Company ↔ CompanyCountry (Uno a Muchos)
  Company.belongsTo(CompanyCountry, {
    foreignKey: 'countryId',
    as: 'country'
  });
  CompanyCountry.hasMany(Company, {
    foreignKey: 'countryId',
    as: 'companies'
  });

  // Company ↔ CompanyAcquisition (Muchos a Muchos)
  Company.belongsToMany(CompanyAcquisition, {
    through: 'company_acquisition_company',
    as: 'acquisitions',
    foreignKey: 'companyId',
    otherKey: 'companyAcquisitionId'
  });
  CompanyAcquisition.belongsToMany(Company, {
    through: 'company_acquisition_company',
    as: 'companies',
    foreignKey: 'companyAcquisitionId',
    otherKey: 'companyId'
  });

  // Company ↔ CompanySite (Muchos a Muchos)
  Company.belongsToMany(CompanySite, {
    through: 'company_site_company',
    as: 'sites',
    foreignKey: 'companyId',
    otherKey: 'companySiteId'
  });
  CompanySite.belongsToMany(Company, {
    through: 'company_site_company',
    as: 'companies',
    foreignKey: 'companySiteId',
    otherKey: 'companyId'
  });

  // Company ↔ CompanyArea (Muchos a Muchos)
  Company.belongsToMany(CompanyArea, {
    through: 'company_area_company',
    as: 'relatedAreas',
    foreignKey: 'companyId',
    otherKey: 'companyAreaId'
  });
  CompanyArea.belongsToMany(Company, {
    through: 'company_area_company',
    as: 'companies',
    foreignKey: 'companyAreaId',
    otherKey: 'companyId'
  });

  // ========================================
  // RELACIONES DEL MÓDULO COMPANY COUNTRY
  // ========================================

  // CompanyCountry ↔ Iso (Muchos a Muchos)
  CompanyCountry.belongsToMany(Iso, {
    through: 'company_country_iso',
    as: 'isos',
    foreignKey: 'companyCountryId',
    otherKey: 'isoId'
  });
  Iso.belongsToMany(CompanyCountry, {
    through: 'company_country_iso',
    as: 'companyCountries',
    foreignKey: 'isoId',
    otherKey: 'companyCountryId'
  });

  // ========================================
  // RELACIONES DEL MÓDULO COMPANY ACQUISITION
  // ========================================

  // CompanyAcquisition ↔ Iso (Muchos a Muchos)
  CompanyAcquisition.belongsToMany(Iso, {
    through: 'company_acquisition_iso',
    as: 'isos',
    foreignKey: 'companyAcquisitionId',
    otherKey: 'isoId'
  });
  Iso.belongsToMany(CompanyAcquisition, {
    through: 'company_acquisition_iso',
    as: 'companyAcquisitions',
    foreignKey: 'isoId',
    otherKey: 'companyAcquisitionId'
  });

  // CompanyAcquisition ↔ CompanyAcquisitionType (Uno a Muchos)
  CompanyAcquisition.belongsTo(CompanyAcquisitionType, {
    foreignKey: 'acquisitionTypeId',
    as: 'acquisitionType'
  });
  CompanyAcquisitionType.hasMany(CompanyAcquisition, {
    foreignKey: 'acquisitionTypeId',
    as: 'acquisitions'
  });

  // ========================================
  // RELACIONES DEL MÓDULO COMPANY AREA
  // ========================================

  // CompanyArea ↔ Iso (Muchos a Muchos)
  CompanyArea.belongsToMany(Iso, {
    through: 'company_area_iso',
    as: 'isos',
    foreignKey: 'companyAreaId',
    otherKey: 'isoId'
  });
  Iso.belongsToMany(CompanyArea, {
    through: 'company_area_iso',
    as: 'companyAreas',
    foreignKey: 'isoId',
    otherKey: 'companyAreaId'
  });

  // CompanyArea ↔ Employee (Muchos a Muchos)
  CompanyArea.belongsToMany(Employee, {
    through: 'company_area_employee',
    as: 'employees',
    foreignKey: 'companyAreaId',
    otherKey: 'employeeId'
  });
  Employee.belongsToMany(CompanyArea, {
    through: 'company_area_employee',
    as: 'companyAreas',
    foreignKey: 'employeeId',
    otherKey: 'companyAreaId'
  });

  // CompanyArea ↔ Company (Uno a Muchos)
  CompanyArea.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
  });
  Company.hasMany(CompanyArea, {
    foreignKey: 'companyId',
    as: 'areas'
  });

  // ========================================
  // RELACIONES DEL MÓDULO EMPLOYEE
  // ========================================

  // Employee ↔ EmployeeNationality (Uno a Muchos)
  Employee.belongsTo(EmployeeNationality, {
    foreignKey: 'nationalityId',
    as: 'nationality'
  });
  EmployeeNationality.hasMany(Employee, {
    foreignKey: 'nationalityId',
    as: 'employees'
  });

  // Employee ↔ Rol (Uno a Muchos)
  Employee.belongsTo(Rol, {
    foreignKey: 'rolId',
    as: 'rol'
  });
  Rol.hasMany(Employee, {
    foreignKey: 'rolId',
    as: 'employees'
  });

  // Employee ↔ Company (Uno a Muchos)
  Employee.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
  });
  Company.hasMany(Employee, {
    foreignKey: 'companyId',
    as: 'employees'
  });

  // Employee ↔ CompanySite (Uno a Muchos)
  Employee.belongsTo(CompanySite, {
    foreignKey: 'employeeSiteId',
    as: 'employeeSite'
  });
  CompanySite.hasMany(Employee, {
    foreignKey: 'employeeSiteId',
    as: 'employees'
  });

  // ========================================
  // RELACIONES DEL MÓDULO SUBCOMPANY
  // ========================================

  // Subcompany ↔ Company (Uno a Muchos)
  Subcompany.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
  });
  Company.hasMany(Subcompany, {
    foreignKey: 'companyId',
    as: 'subcompanies'
  });

  // ========================================
  // RELACIONES DEL MÓDULO SUBCOMPANY EMPLOYEE
  // ========================================

  // SubcompanyEmployee ↔ Subcompany (Uno a Muchos)
  SubcompanyEmployee.belongsTo(Subcompany, {
    foreignKey: 'subcompanyId',
    as: 'subcompany'
  });
  Subcompany.hasMany(SubcompanyEmployee, {
    foreignKey: 'subcompanyId',
    as: 'subcompanyEmployees'
  });

  // SubcompanyEmployee ↔ Employee (Uno a Muchos)
  SubcompanyEmployee.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
  });
  Employee.hasMany(SubcompanyEmployee, {
    foreignKey: 'employeeId',
    as: 'subcompanyEmployees'
  });

  // ========================================
  // RELACIONES DEL MÓDULO ACTIVITY
  // ========================================

  // Activity ↔ Employee (Uno a Muchos)
  Activity.belongsTo(Employee, {
    foreignKey: 'employeeId',
    as: 'employee'
  });
  Employee.hasMany(Activity, {
    foreignKey: 'employeeId',
    as: 'activities'
  });

  // Activity ↔ GeneralObjective (Uno a Muchos)
  Activity.belongsTo(GeneralObjective, {
    foreignKey: 'generalObjectiveId',
    as: 'generalObjective'
  });
  GeneralObjective.hasMany(Activity, {
    foreignKey: 'generalObjectiveId',
    as: 'activities'
  });

  // Activity ↔ SpecificObjective (Uno a Muchos)
  Activity.belongsTo(SpecificObjective, {
    foreignKey: 'specificObjectiveId',
    as: 'specificObjective'
  });
  SpecificObjective.hasMany(Activity, {
    foreignKey: 'specificObjectiveId',
    as: 'activities'
  });

  // Activity ↔ ManagementTool (Uno a Muchos)
  Activity.belongsTo(ManagementTool, {
    foreignKey: 'managementToolId',
    as: 'managementTool'
  });
  ManagementTool.hasMany(Activity, {
    foreignKey: 'managementToolId',
    as: 'activities'
  });

  // ========================================
  // RELACIONES DEL MÓDULO OBJECTIVES
  // ========================================

  // GeneralObjective ↔ SpecificObjective (Uno a Muchos)
  GeneralObjective.hasMany(SpecificObjective, {
    foreignKey: 'generalObjectiveId',
    as: 'specificObjectives'
  });
  SpecificObjective.belongsTo(GeneralObjective, {
    foreignKey: 'generalObjectiveId',
    as: 'generalObjective'
  });

  // ========================================
  // RELACIONES DEL MÓDULO EMPLOYEE COMPANY REGISTRY
  // ========================================

  // Este modelo no tiene relaciones directas con otros modelos
  // ya que actúa como una tabla de registro independiente

};

module.exports = {
  defineRelations,
}; 