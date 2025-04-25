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
  employeeIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    default: null
  }],
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    default: null
  },
});

/*
  Al eliminar una o varias áreas (serán de la misma compañia) eliminamos el "companyId"
  de los empleados del registro de empleados cuyos mails coincidan con los empleados del área
*/
companyAreaSchema.pre(['deleteMany', 'deleteOne'], async function(next) {
  try {
    let areasAEliminar;

    //deleteOne
    if (this.model.name === 'companyArea' && this.op === 'deleteOne') {
      const areaAEliminar = await this.model.findOne(this.getQuery()).populate('employeeIds');
      if (areaAEliminar) {
        areasAEliminar = [areaAEliminar];
      } else {
        areasAEliminar = [];
      }
    }
    //deleteMany
    else if (this.model.name === 'companyArea' && this.op === 'deleteMany') {
      areasAEliminar = await this.model.find(this.getQuery()).populate('employeeIds');
    } else {
      return next();
    }

    if (areasAEliminar && areasAEliminar.length > 0) {
      const companyIdAEliminar = areasAEliminar[0].companyId;
      await Promise.all(
        areasAEliminar.map(async (area) => {
          if (area.employeeIds && area.employeeIds.length > 0) {
            const employeeEmailsToDelete = area.employeeIds.map(employee => employee.email);
            await this.model.base.model('EmployeeCompanyRegistry').updateMany(
              { employeeEmail: { $in: employeeEmailsToDelete } },
              { $pull: { companyIds: companyIdAEliminar } }
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


/*
  Al hacer un $pull en el campo employeeIds (es decir quitamos un empleado del área)
  o al hacer un $psuh (es decir agregamos un empleado al área), eliminamos o agregamos el companyId
  del EmployeeCompanyRegistry de los empleados
*/
companyAreaSchema.pre('findOneAndUpdate', async function(next) {
  try {

    //Eliminación de un empleado del área, por ende hacemos una operación de quitado a la tabla de registro de empleados
    if (this._update.$pull && this._update.$pull.employeeIds) {
      const area = await this.model.findOne(this.getQuery()).populate('employeeIds');
      if (area) {
        const employeeIdsToRemove = Array.isArray(this._update.$pull.employeeIds)
          ? this._update.$pull.employeeIds
          : [this._update.$pull.employeeIds];

        const employeesToRemove = area.employeeIds.filter(employee =>
          employeeIdsToRemove.some(id => id.equals(employee._id))
        );

        if (employeesToRemove.length > 0) {
          const companyIdToRemove = area.companyId;
          const employeeEmailsToRemove = employeesToRemove.map(employee => employee.email);

          await this.model.base.model('EmployeeCompanyRegistry').updateMany(
            { employeeEmail: { $in: employeeEmailsToRemove } },
            { $pull: { companyIds: companyIdToRemove } }
          );
        }
      }
    }

    //Agregación de un empleado al área, por ende hacemos una operación de agregado a la tabla de registro de empleados
    else if (this._update.$push && this._update.$push.employeeIds) {
      const area = await this.model.findOne(this.getQuery()).populate('employeeIds');
      if (area) {
        const employeeIdToAdd = this._update.$push.employeeIds;
        const employeeToAdd = area.employeeIds.find(employee => employee._id.equals(employeeIdToAdd));

        if (employeeToAdd) {
          const companyIdToAdd = area.companyId;
          const employeeEmailToAdd = employeeToAdd.email;

          await this.model.base.model('EmployeeCompanyRegistry').findOneAndUpdate(
            { employeeEmail: employeeEmailToAdd },
            { $addToSet: { companyIds: companyIdToAdd } },
            { new: true, upsert: true }
          );
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('companyArea', companyAreaSchema);