const preload = require('../middleware/preload.js');
const { isUser } = require('../middleware/guards.js');
const { getPlaysUser, getPlaysGuest, getMostLikedPlay, getPlaysByDate } = require('../services/play.js');

const router = require('express').Router();

router.get('/', preload(), async (req, res) => {
    console.log(res.locals.user);
    if (res.locals.hasUser) {
        let plays = await getPlaysUser();

        plays = plays.map(p => ({ ...p, likes: p.users.length }));

        res.render('homeUser', { title: 'Home Page', plays });

    } else {
        const plays = await getPlaysGuest();

        res.render('homeGuest', { title: 'Home Page', plays });
    }
});

router.get('/sortByDate', isUser(), async (req, res) => {
    let plays = await getPlaysByDate();

    plays = plays.map(p => ({ ...p, likes: p.users.length }));

    res.render('homeUser', { title: 'Home Page', plays });
});


router.get('/sortByLikes', isUser(), async (req, res) => {
    let plays = await getMostLikedPlay();
    plays = plays.map(p => ({ ...p, likes: p.users.length }));

    res.render('homeUser', { title: 'Home Page', plays });    
});

module.exports = router;