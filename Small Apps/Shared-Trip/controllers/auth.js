const router = require('express').Router();

const mapErrors = require('../util/mappers.js');
const { register, login } = require('../services/user.js');
const { isGuest, isUser } = require('../middleware/guards.js');

router.get('/register', isGuest(), (req, res) => {
    // res.render('register', { layout: false });
    res.render('register', {title: 'Register Page'});
});

router.post('/register', isGuest(), async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.email.trim() == '') {
            throw new Error('An email is required!');
        }

        if (req.body.password.trim().length < 4) {
            throw new Error('Password must be at least 4 characters long!');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match!');
        }

        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        const isMale = req.body.gender == 'male';
        res.render('register', { user: { email: req.body.email, password: req.body.password , repass: req.body.repass, isMale}, errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    // res.render('login', { layout: false });
    res.render('login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        // res.render('login', { layout: false, data: { username: req.body.username }, errors });
        res.render('login', { user: { email: req.body.email }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;