const passtService = require('./passtService');

//Crear passt
const createPasst = async (req, res) => {
  try {
    const passt = await passtService.createPasst(req);
    res.status(201).json(passt);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error creando PASST', error: error.message });
  }
};

//Obtener todos los PASSTs
const getAllPASSTs = async (req, res) => {
  try {
    const passts = await passtService.getPassts();
    res.status(200).json(passts);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todas los PASSTs', error: error.message });
  }
};

//Obtener PASST por ID
const getPASST = async (req, res) => {
  try {
    const passt = await passtService.getPasst(req);
    if (!passt) {
      return res.status(404).json({ message: 'PASST no encontrada' });
    }
    res.status(200).json(companyArea);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo el PASST', error: error.message });
  }
};


//Eliminar PASST por ID
const deletePasst = async (req, res) => {
  try {
    await passtService.deletePasst(req);
    res.status(200).json({ message: 'PASST eliminada satisfactoriamente' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error eliminando el PASST', error: error.message });
  }
};


module.exports = {
  createPasst,
  getAllPASSTs,
  getPASST,
  deletePasst
};