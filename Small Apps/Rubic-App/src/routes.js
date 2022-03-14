const express = require('express');

const cubeController = require('./controllers/cubeController.js');
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const detailsController = require('./controllers/detailsController.js');
const accessoryController = require('./controllers/accessoryController.js');

const router = express.Router();

router.use(homeController);
router.use('/cube', cubeController);
router.use('/cube/details', detailsController);
router.use('/accessory', accessoryController);
router.use('/', authController);

router.use('*', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;