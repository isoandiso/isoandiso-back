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
  require('./tables/activity/activityRoutes'),
  require('./tables/activitycompletiondate/activityCompletionDateRoutes'),
  require('./tables/specificobjective/specificObjectiveRoutes'),
  require('./tables/generalobjective/generalObjectiveRoutes'),
  require('./tables/subcompany/subcompanyRoutes'),
  require('./tables/worker/workerRoutes'),
  require('./tables/subcompanyworker/subcompanyWorkerRoutes'),
  require('./tables/user/userRoutes'),
  require('./tables/companyacquisition/companyAcquisitionRoutes'),
  require('./tables/companyarea/companyAreaRoutes'),
  require('./tables/company/companyRoutes'),
  require('./tables/iso/isoRoutes'),
  require('./tables/companycountry/companyCountryRoutes'),
  require('./tables/rol/rolRoutes'),
  require('./tables/workerNationality/workerNationalityRoutes'),
  require('./tables/companysite/companySiteRoutes'),
  require('./tables/companyacquisitiontype/companyAcquisitionTypeRoutes'),
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