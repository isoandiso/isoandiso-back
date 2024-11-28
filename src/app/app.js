require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongoose } = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectToMongoose();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());

// Rutas
const rutas = [
  require('../isoandiso/tables/actividad/actividadRoutes'),
  require('../isoandiso/tables/fechacumplimientoactividad/fechaCumplimientoActividadRoutes'),
  require('../isoandiso/tables/objetivoespecifico/objetivoEspecificoRoutes'),
  require('../isoandiso/tables/objetivogeneral/objetivoGeneralRoutes'),
  require('../isoandiso/tables/subempresa/subempresaRoutes'),
  require('../isoandiso/tables/trabajador/trabajadorRoutes'),
  require('../isoandiso/tables/trabajadorsubempresa/trabajadorSubempresaRoutes'),
  require('../isoandiso/tables/usuario/usuarioRoutes'),
  require('../webiso/tables/adquisicionempresa/adquisicionEmpresaRoutes'),
  require('../webiso/tables/areaempresa/areaEmpresaRoutes'),
  require('../webiso/tables/empresa/empresaRoutes'),
  require('../webiso/tables/iso/isoRoutes'),
  require('../webiso/tables/nacionalidad/nacionalidadRoutes'),
  require('../webiso/tables/pais/paisRoutes'),
  require('../webiso/tables/rol/rolRoutes'),
  require('../webiso/tables/sede/sedeRoutes'),
  require('../webiso/tables/tipodeadquisicion/tipoDeAdquisicionRoutes'),
  require('../webiso/tables/paymentmethods/paymentMethodRoutes'),
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
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
