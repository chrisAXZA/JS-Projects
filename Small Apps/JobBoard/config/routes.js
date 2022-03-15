const authController = require('../controllers/auth.js');
const playController = require('../controllers/ad.js');
const homeController = require('../controllers/home.js');

module.exports = (app) => {
    app.use(authController);
    app.use(playController);
    app.use(homeController);

    app.get('*', (req, res)=>{
        res.render('404', {title: 'Page not found!'});
    });
};