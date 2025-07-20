require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const { defineRelations } = require('./table_relations');
const app = express();

// Importar modelos
require('./companypage/company/companySchema');
require('./companypage/companycountry/companyCountrySchema');
require('./companypage/companyacquisition/companyAcquisitionSchema');
require('./companypage/companyacquisitiontype/companyAcquisitionTypeSchema');
require('./companypage/companysite/companySiteSchema');
require('./companypage/companyarea/companyAreaSchema');
require('./companypage/iso/isoSchema');
require('./employeepage/employee/employeeSchema');
require('./employeepage/employeenationality/employeeNationalitySchema');
require('./employeepage/generalobjective/generalObjectiveSchema');
require('./employeepage/managementtool/managementToolSchema');
require('./employeepage/rol/rolSchema');
require('./employeepage/specificobjective/specificObjectiveSchema');
require('./employeepage/subcompany/subcompanySchema');
require('./employeepage/subcompanyemployee/subcompanyEmployeeSchema');
require('./employeepage/activity/activitySchema');
require('./partnerpage/user/userSchema');
require('./employeecompanyregistry/employeeCompanyRegistrySchema');

// Definir relaciones
defineRelations();

// Conectar a la base de datos
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected via Sequelize...');

    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log('Database synchronized...');
  } catch (error) {
    console.error('Error al conectar a MySQL con Sequelize:', error);
    process.exit(1);
  }
}
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());

// Rutas
const rutas = [
  require('./employeepage/activity/activityRoutes'),
  require('./employeepage/specificobjective/specificObjectiveRoutes'),
  require('./employeepage/managementtool/managementToolRoutes'),
  require('./employeepage/generalobjective/generalObjectiveRoutes'),
  require('./employeepage/subcompany/subcompanyRoutes'),
  require('./employeepage/employee/employeeRoutes'),
  require('./employeepage/subcompanyemployee/subcompanyEmployeeRoutes'),
  require('./partnerpage/user/userRoutes'),
  require('./companypage/companyacquisition/companyAcquisitionRoutes'),
  require('./companypage/companyarea/companyAreaRoutes'),
  require('./companypage/company/companyRoutes'),
  require('./companypage/iso/isoRoutes'),
  require('./companypage/companycountry/companyCountryRoutes'),
  require('./employeepage/rol/rolRoutes'),
  require('./employeepage/employeenationality/employeeNationalityRoutes'),
  require('./companypage/companysite/companySiteRoutes'),
  require('./companypage/companyacquisitiontype/companyAcquisitionTypeRoutes'),
  require('./employeecompanyregistry/employeeCompanyRegistryRoutes'),
];
rutas.forEach(route => app.use(route));

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, sequelize };
