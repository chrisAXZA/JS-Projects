const router = require('express').Router();
const authService = require('../services/authService.js');
// const { createToken } = require('../utils/jwtUtils.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    // console.log(req.body);

    const { username, password } = req.body;
    let user = await authService.login(username, password);

    if (!user) {
        return res.redirect('/404');
    }

    let token = await authService.createToken(user);

    console.log('>>>' + user, '>>>' + token);

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    try {
        let { username, password, repeatPassword } = req.body;

        await authService.register(username, password, repeatPassword);

        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;