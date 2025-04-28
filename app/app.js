require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Conectar a la base de datos
async function connectToMongoose() {
  try {
    await mongoose.connect(process.env.URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
    process.exit(1);
  }
}
connectToMongoose();

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

module.exports = app;