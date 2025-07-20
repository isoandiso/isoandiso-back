require('dotenv').config();
const sequelize = require('./db');

const CompanyCountry = require('./companypage/companycountry/companyCountrySchema');
const Company = require('./companypage/company/companySchema');
const Employee = require('./employeepage/employee/employeeSchema');
const Rol = require('./employeepage/rol/rolSchema');
const EmployeeNationality = require('./employeepage/employeenationality/employeeNationalitySchema');
const CompanySite = require('./companypage/companysite/companySiteSchema');
const CompanyArea = require('./companypage/companyarea/companyAreaSchema');

(async () => {
  try {
    await sequelize.authenticate();

    // 1. País
    const peru = await CompanyCountry.create({ name: 'Perú' });

    // 2. Rol
    const jefe = await Rol.create({ name: 'Jefe' });

    // 3. Nacionalidad
    const nationality1 = await EmployeeNationality.create({ name: 'Peruana' });

    // 4. Sede
    const site1 = await CompanySite.create({
      name: 'Sede Central',
      address: 'Av. Principal 123',
      city: 'Lima',
      province: 'Lima'
    });

    // 5. Empresa
    const empresa1 = await Company.create({
      email: 'empresa1@correo.com',
      password: 'Empresa1*123',
      ruc: '12345678901',
      socialReason: 'Empresa Uno SAC',
      countryId: peru.id,
      province: 'Lima',
      city: 'Lima',
      address: 'Av. Principal 123',
      economicActivity: 'Servicios',
      economicSector: 'Tecnología',
      companySize: 'Mediana'
    });

    // 6. Área de empresa
    const area1 = await CompanyArea.create({
      name: 'Administración',
      charges: [],
      companyId: empresa1.id
    });

    // 7. Empleado
    await Employee.create({
      name: 'Juan',
      fathers_lastname: 'Pérez',
      mothers_lastname: 'García',
      email: 'juan@gmail.com',
      password: 'Empleado*123',
      dni: '12345678',
      birthDate: '1990-01-01',
      companyAreaId: area1.id,
      entryDate: '2022-01-01',
      areaEntryDate: '2022-01-01',
      province: 'Lima',
      city: 'Lima',
      address: 'Calle Falsa 123',
      district: 'Miraflores',
      corporateEmail: 'juan@empresa1.com',
      nationalityId: nationality1.id,
      gender: 'Masculino',
      civilStatus: 'Soltero/a',
      personalPhone: '+51987654321',
      status: 'Activo',
      employeeSiteId: site1.id,
      rolId: jefe.id,
      sizePants: 32,
      sizePolo: 'M',
      sizeShoe: 40,
      companyId: empresa1.id
    });

    console.log('Datos de prueba insertados correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error insertando datos de prueba:', error);
    process.exit(1);
  }
})();