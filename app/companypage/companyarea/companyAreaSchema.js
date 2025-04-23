const mongoose = require('mongoose');

const companyAreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  charges: [{
    type: String,
    required: true,
  }],
  isoIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'iso',
    default: null
  }],
  responsibleEmployeeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    default: null
  }]
});

// Middleware para ejecutar antes de eliminar uno o varios documentos de companyArea
companyAreaSchema.pre(['deleteMany', 'deleteOne'], async function(next) {
  try {
    let areasAEliminar;

    if (this.model.name === 'companyArea' && this.op === 'deleteOne') {
      // Para deleteOne, this.getQuery() contiene la condición para encontrar el documento a eliminar
      const areaAEliminar = await this.model.findOne(this.getQuery()).populate('responsibleEmployeeIds');
      if (areaAEliminar) {
        areasAEliminar = [areaAEliminar];
      } else {
        areasAEliminar = []; // No se encontró el área a eliminar
      }
    } else if (this.model.name === 'companyArea' && this.op === 'deleteMany') {
      // Para deleteMany, this.getQuery() contiene la condición para encontrar los documentos a eliminar
      areasAEliminar = await this.model.find(this.getQuery()).populate('responsibleEmployeeIds');
    } else {
      return next(); // Si no es una operación de eliminación en companyArea, salimos
    }

    if (areasAEliminar && areasAEliminar.length > 0) {
      const companyIdParaEliminar = this.model.base.model('company')._id; // Necesitamos el companyId. Asumo que lo tienes disponible de alguna manera en el contexto de la eliminación. Deberás ajustar esto según tu lógica.

      await Promise.all(
        areasAEliminar.map(async (area) => {
          if (area.responsibleEmployeeIds && area.responsibleEmployeeIds.length > 0) {
            await Promise.all(
              area.responsibleEmployeeIds.map(async (employee) => {
                await this.model.base.model('employeeCompanyRegistry').findOneAndUpdate(
                  { employeeEmail: employee.email },
                  { $pull: { companyIds: companyIdParaEliminar } }
                );
              })
            );
          }
        })
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('companyArea', companyAreaSchema);