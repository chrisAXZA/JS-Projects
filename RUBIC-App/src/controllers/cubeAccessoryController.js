const router = require('express').Router({ mergeParams: true });

const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');

router.get('/add', async (req, res) => {
    // let accessories = [];
    // let accessories = await accessoryService.getAll();
    let cube = await cubeService.getOne(req.params.cubeId);
    let accessories = await accessoryService.getAllWithout(cube.accessories.map(a => a._id));

    // console.log(req.params.cubeId);
    // res.render('cube/accessory/add', cube);
    res.render('cube/accessory/add', { cube, accessories });

    // res.end();
});

router.post('/add', async (req, res) => {
    const cubeId = req.params.cubeId;

    await cubeService.attachAccessory(cubeId, req.body.accessory);

    res.redirect(`/cube/${cubeId}`);
});

module.exports = router;