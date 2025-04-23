const mongoose = require('mongoose');

const subcompanySchema = new mongoose.Schema({
  ruc: { type: String, required: true },
  socialReason: { type: String, required: true },
  economicActivity: { type: String, required: true },
  economicSector: { type: String, required: true },
  companySize: { type: String, enum: ['Micro', 'Pequeña', 'Mediana', 'Grande'], required: true },
  entryDate: { type: Date, required: true },
  contractTerminationDate: {
    type: Date,
    validate: {
      validator: function (v) {
        if(v!==null){
          return v > this.entryDate;
        }
      },
      message: props => `La fecha de término de contrato (${props.value}) debe ser mayor a la fecha de ingreso (${this.entryDate}).`,
    },
    default: null,
  },
});

module.exports = mongoose.model('subcompany', subcompanySchema);
