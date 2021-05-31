// ruta: /api/home

const { Router } = require('express');
const { getDatosHome ,getUniversidades} = require('./../controllers/home');

const router = Router();

// listar datos home
router.get('/', [], getDatosHome);

//Obtener universidades
router.get(
    '/universidades',[],
    getUniversidades
);

module.exports = router;