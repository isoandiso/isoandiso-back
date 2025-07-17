require('dotenv').config();
const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'isoandiso_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Cambiar a console.log para ver las queries SQL
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true, // Agrega createdAt y updatedAt automáticamente
      underscored: true, // Usa snake_case para nombres de columnas
      freezeTableName: true // Mantiene los nombres de tabla como están
    }
  }
);

// Conectar a la base de datos
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected via Sequelize...');
    
    // Sincronizar modelos con la base de datos
    // En desarrollo: force: true (recrea tablas)
    // En producción: alter: true (modifica tablas existentes)
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