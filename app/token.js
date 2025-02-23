const jwt = require('jsonwebtoken');

function createToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, profile) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    req.profile = profile;
    next();
  });
};

module.exports = {
  createToken,
  verifyToken
}
