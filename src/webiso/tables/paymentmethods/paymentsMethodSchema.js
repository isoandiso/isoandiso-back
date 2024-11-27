const metodoPagoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String
});

const MetodoPago = mongoose.model('metodoPago', metodoPagoSchema);