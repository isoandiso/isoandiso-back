const jwt = require('jsonwebtoken');

function createUserToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_USER, { expiresIn: "1d" });
}

function createWorkerToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_WORKER, { expiresIn: "1d" });
}

function createCompanyToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_COMPANY, { expiresIn: "1d" });
}

function createPartnerToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET_PARTNER, { expiresIn: "1d" });
}

module.exports = {
  createUserToken,
  createWorkerToken,
  createCompanyToken,
  createPartnerToken
}