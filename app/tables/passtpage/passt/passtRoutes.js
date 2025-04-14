const express = require('express');
const router = express.Router();


//MIDDLEWARE
const { verifyToken } = require('../../../token');

//CONTROLADOR
const passtController = require('./passtController');