const authController = require('../controllers/auth.js');
const playController = require('../controllers/play.js');
const homeController = require('../controllers/home.js');

module.exports = (app) => {
    app.use(authController);
    app.use(playController);
    app.use(homeController);
};