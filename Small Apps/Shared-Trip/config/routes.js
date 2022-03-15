const authController = require('../controllers/auth.js');
const tripController = require('../controllers/trip.js');
const homeController = require('../controllers/home.js');

module.exports = (app) => {
    app.use(authController);
    app.use(tripController);
    app.use(homeController);

    app.get('*', (req, res)=>{
        res.render('404', {title: 'Page not found!'});
    });
};