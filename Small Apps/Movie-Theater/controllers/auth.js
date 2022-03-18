const router = require('express').Router();

const mapErrors = require('../util/mappers.js');
const { register, login } = require('../services/user.js');
const { isGuest, isUser } = require('../middleware/guards.js');

router.get('/register', isGuest(), (req, res) => {
    // res.render('register', { layout: false });
    res.render('register', {title: 'Register Page'});
});

router.post('/register', isGuest(), async (req, res) => {
    // console.log(req.body)
    try {
        if (req.body.username.trim() == '') {
            throw new Error('An username is required!');
        }

        if (req.body.password.trim().length < 3) {
            throw new Error('Password must be at least 3 characters long!');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match!');
        }

        const user = await register(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        // console.error(err);
        const errors = mapErrors(err);
        // const isMale = req.body.gender == 'male';
        res.render('register', { user: { username: req.body.username, password: req.body.password , repass: req.body.repass}, errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    // res.render('login', { layout: false });
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        // res.render('login', { layout: false, data: { username: req.body.username }, errors });
        res.render('login', { user: { username: req.body.username }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;