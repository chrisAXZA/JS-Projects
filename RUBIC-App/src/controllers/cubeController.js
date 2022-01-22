const express = require('express');
const cubeService = require('../services/cubeService.js');

const router = express.Router();

const renderCreateCube = async (req, res) => {
    // let cubes = await cubeService.getAll();
    // console.log(cubes);

    res.render('create');
};

const createCube = async (req, res) => {
    // console.log(req.body);
    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty);
        res.redirect('/');
    } catch (err) {
        res.status(404).send(err.message).end();
        // res.status(404).json({ message: 'Could not create Cube!', err });
    }


    // res.redirect('/cube/create');
};

const cubeDetails = async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId);
    // console.log(cube);
    // res.end();

    res.render('details', cube);
    // res.render('details', { ...cube })
};

router.get('/create', renderCreateCube);
router.post('/create', createCube);
router.get('/:cubeId', cubeDetails);

module.exports = router;