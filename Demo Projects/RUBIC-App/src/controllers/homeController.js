const express = require('express');
const cubeService = require('../services/cubeService.js');
const Cube = require('../models/Cube.js');

const router = express.Router();

const home = async (req, res) => {
    let cubes = await cubeService.getAll();

    // let test = await Cube.findByName('Mirror Cube');

    // console.log(test);

    res.render('index', {
        cubes
    });
};

const about = (req, res) => {
    res.render('about');
};

const search = async (req, res) => {
    // console.log(req.query);
    // let search = req.query.search;
    // let from = req.query.from;
    // let to = req.query.to;
    let { search, from, to } = req.query;

    let cubes = await cubeService.search(search, from, to);

    if (cubes.length < 1) {
        return res.redirect('/');
    }

    res.render('index', {
        cubes,
        title: 'SEARCH',
        search,
        from,
        to
    });
};

router.get('/', home);
router.get('/about', about);
router.get('/search', search);

module.exports = router;