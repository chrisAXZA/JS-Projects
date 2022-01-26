const express = require('express');
const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const { isAuth } = require('../middlewares/authMiddleware.js');
const Cube = require('../models/Cube.js');

// router.use(isAuth);

const router = express.Router();

const renderCreateCube = async (req, res) => {
    // let cubes = await cubeService.getAll();
    // console.log(cubes);

    res.render('cube/create');
};

const createCube = async (req, res) => {
    // console.log(req.body);
    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty);
        res.redirect('/');
    } catch (err) {
        // res.status(404).send(err.message).end();
        // res.status(404).json({ message: 'Could not create Cube!', err });
    }


    // res.redirect('/cube/create');
};

const cubeDetails = async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId);
    // console.log(cube);
    // res.end();

    res.render('cube/details', cube);
    // res.render('details', cube);
    // res.render('details', { ...cube })
};

const getEditCubePage = (req, res) => {
    // console.log(req.body);
    res.render('cube/edit');
};

const getDeleteCubePage = async (req, res) => {
    // console.log(req.user);
    // if (!req.user) {
    //     return res.redirect('/login');
    //     // return res.status(401).redirect('/404');
    // }

    let cubeId = req.params.cubeId;
    let cube = await cubeService.getOne(cubeId);

    res.render('cube/delete', cube);
};

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);

    res.redirect(`/`)
};

router.get('/create', isAuth, renderCreateCube);
router.post('/create', isAuth, createCube);
router.get('/:cubeId/edit', isAuth, getEditCubePage);
router.get('/:cubeId/delete', isAuth, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth, postDeleteCubePage);
router.get('/:cubeId', cubeDetails);

router.use('/:cubeId/accessory', cubeAccessoryController);
// router.get('/:cubeId/accessory/add', addCubeAccessory);

module.exports = router;