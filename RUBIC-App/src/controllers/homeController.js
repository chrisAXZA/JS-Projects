const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const renderHome = (req, res) => {
    let cubes = cubeService.getAll();

    res.render('index', {
        cubes
    });
};

router.get('/', renderHome);

module.exports = router;