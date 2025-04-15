require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');

// Swagger
const swaggerFile = require('./../swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
  require('./tables/employeepage/activity/activityRoutes'),
  require('./tables/employeepage/specificobjective/specificObjectiveRoutes'),
  require('./tables/employeepage/managementtool/managementToolRoutes'),
  require('./tables/employeepage/generalobjective/generalObjectiveRoutes'),
  require('./tables/employeepage/subcompany/subcompanyRoutes'),
  require('./tables/employeepage/employee/employeeRoutes'),
  require('./tables/employeepage/subcompanyemployee/subcompanyEmployeeRoutes'),
  require('./tables/partnerpage/user/userRoutes'),
  require('./tables/companypage/companyacquisition/companyAcquisitionRoutes'),
  require('./tables/companypage/companyarea/companyAreaRoutes'),
  require('./tables/companypage/company/companyRoutes'),
  require('./tables/companypage/iso/isoRoutes'),
  require('./tables/companypage/companycountry/companyCountryRoutes'),
  require('./tables/employeepage/rol/rolRoutes'),
  require('./tables/employeepage/employeenationality/employeeNationalityRoutes'),
  require('./tables/companypage/companysite/companySiteRoutes'),
  require('./tables/companypage/companyacquisitiontype/companyAcquisitionTypeRoutes'),
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