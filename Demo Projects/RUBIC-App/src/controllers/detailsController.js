const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const details = (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = cubeService.getOne(cubeId);

    res.render('details', cube);
};

router.get('/:cubeId', details);

module.exports = router;