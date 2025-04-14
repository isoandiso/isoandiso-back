require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
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

// Función para cargar rutas automáticamente
function loadAllRoutes(app, baseDir = path.join(__dirname, 'tables')) {
  function loadRoutes(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        loadRoutes(fullPath); // Recurse into subdirectories
      } else if (file.endsWith('Routes.js')) {
        try {
          const route = require(fullPath);
          app.use(route); // Podés usar: app.use('/api', route) si querés prefijo
          console.log(`Ruta cargada: ${fullPath}`);
        } catch (err) {
          console.error(`Error al cargar la ruta: ${fullPath}`, err.message);
        }
      }
    });
  }

  loadRoutes(baseDir);
}

// Cargar rutas
loadAllRoutes(app);

// Swagger
const swaggerFile = require('./../swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
