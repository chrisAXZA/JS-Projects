const router = require('express').Router();

const { isGuest, isOwner, isUser } = require('../middleware/guards.js');
const { register, login } = require('../services/user.js');
const mapErrors = require('../util/mappers.js');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', isGuest(), async (req, res) => {
    console.log(req.body)
    try {
        if (req.body.email.trim() == '') {
            throw new Error('An email is required!');
        }

        if (req.body.password.trim().length < 5) {
            throw new Error('Password must be at least 5 characters long!');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords do not match!');
        }

        const user = await register(req.body.email, req.body.password, req.body.description);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('register', { title: 'Register Page', user: { email: req.body.email, password: req.body.description }, errors });
    }
});

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('login', { title: 'Login Page', user: { email: req.body.email }, errors });
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;