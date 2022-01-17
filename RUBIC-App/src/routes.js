const express = require('express');

const cubeController = require('./controllers/cubeController.js');
const homeController = require('./controllers/homeController.js');
const detailsController = require('./controllers/detailsController.js');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/cube/details', detailsController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;