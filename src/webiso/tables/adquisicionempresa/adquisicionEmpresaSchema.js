const mongoose = require('mongoose');

const adquisicionEmpresaSchema = new mongoose.Schema({
    isoIds:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'iso',
      required: true
    }],
    tipoDeAdquisicionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tipoDeAdquisicion',
      required: true
    },
    metodoPagoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'metodoPago',
      required: false
    },
    fechaAdquisicion: { type: Date, required: true, default: Date.now },
    fechaVencimiento: { type: Date },
    linkFactura: {type: String}
});

//Pre-save hook para calcular fechaVencimiento
adquisicionEmpresaSchema.pre('save', async function (next) {
  try {
      const tipoDeAdquisicion = await mongoose.model('tipoDeAdquisicion').findById(this.tipoDeAdquisicionId);
      if (!tipoDeAdquisicion) {
          throw new Error('Tipo de adquisición no encontrado');
      }

      const tipoNombre = tipoDeAdquisicion.nombre;
      
      if (tipoNombre === 'Alquiler' || tipoNombre === 'Gratuito') {
          //Si es "Alquiler" o "Gratuito", sumamos 2 meses a fechaAdquisicion
          const fechaVencimiento = new Date(this.fechaAdquisicion);
          fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 2);
          this.fechaVencimiento = fechaVencimiento;
      } if (tipoNombre === 'Compra' && (!this.metodosPago || this.metodosPago.length === 0)) {
        const error = new Error('Se requiere al menos un método de pago para las compras');
        error.statusCode = 400;
        return next(error);
      }

      next();
  } catch (err) {
      next(err);
  }
});


module.exports = mongoose.model('adquisicionEmpresa', adquisicionEmpresaSchema);