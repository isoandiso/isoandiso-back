const socioService = require('./sociosServices'); 


const createPartner = async (req, res) => {
  try {
    const socio = await socioService.createPartner(req); 
    res.status(201).json(socio);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error registrando el socio', error: error.message });
  }
};


const getAllPartners = async (req, res) => {
  try {
    const socios = await socioService.getAllPartners(); 
    res.status(200).json(socios);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo todos los socios', error: error.message });
  }
};


const getAllDetailsOfPartner = async (req, res) => {
  try {
    const details = await socioService.getAllDetailsOfPartner(req.params.id); 
    res.status(200).json(details);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: 'Error obteniendo detalles del socio', error: error.message });
  }
};

module.exports = {
  createPartner,
  getAllPartners,
  getAllDetailsOfPartner
};
