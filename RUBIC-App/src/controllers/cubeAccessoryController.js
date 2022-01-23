const router = require('express').Router({ mergeParams: true });

const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');

router.get('/add', async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId);
    // let accessories = [];
    let accessories = await accessoryService.getAll();

    // console.log(req.params.cubeId);
    // res.render('cube/accessory/add', cube);
    res.render('cube/accessory/add', { cube, accessories });

    // res.end();
});

module.exports = router;