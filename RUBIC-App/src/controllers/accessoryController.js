const router = require('express').Router();
const accessoryService = require('../services/accessoryService.js')

// console.log(create);

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    let { name, description, imageUrl } = req.body;
    let accessory = await accessoryService.create(name, description, imageUrl);

    // console.log(accessory);

    res.redirect('/');
});

module.exports = router;