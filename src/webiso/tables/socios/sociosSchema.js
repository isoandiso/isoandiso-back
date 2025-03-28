const mongoose = require('mongoose');

const socioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    rol: {
    //   type: mongoose.Schema.Types.ObjectId,
    type: String,
      ref: 'rol', // Referencia al esquema de roles
      required: true,
    },
    pais: {
        type: String,
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'pais', // Referencia al esquema de países
      required: true,
    },
    iso: {
        type: String,
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'iso', // Referencia al esquema de países
      required: true,
    },
    estatus: {
      type: String,
      enum: ['Activo', 'Inactivo', 'Pendiente'],
      default: 'Pendiente',
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Socio', socioSchema);
