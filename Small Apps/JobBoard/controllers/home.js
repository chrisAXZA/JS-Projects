const { isUser } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { getHomeAds, getAllAds, getMostLikedPlay, getPlaysByDate, getAllHousings, getHousingsBySearch, searchAds, getHomeAdsNewest } = require('../services/ad.js');

const router = require('express').Router();

router.get('/', preload(), async (req, res) => {
    // let ads = await getHomeAds();
    
    let ads = await getHomeAdsNewest();
    ads = ads.map(a => ({ ...a, candidates: a.users.length }));

    res.render('home', { title: 'Home Page', ads });
});

router.get('/allAds', async (req, res) => {
    let ads = await getAllAds();

    res.render('allAds', { title: 'All Ads', ads });
});

router.get('/search', preload(), isUser(), async (req, res) => {
    console.log(req.query);

    let ads = [];

    if (req.query.text != undefined) {
        ads = await searchAds(req.query.text);
    }

    res.render('search', { title: 'Search Page', ads, text: req.query.text });
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


router.get('/housings', async (req, res) => {
    const housings = await getAllHousings();
    res.render('catalog', { title: 'All Housings', housings });
});

router.get('/housings/:id', preload(true), (req, res) => {
    const currentHousing = res.locals.housing;

    if (currentHousing.renters.length > 0) {
        currentHousing.hasRenters = true;
    } else {
        currentHousing.hasRenters = false;
    }

    if (req.session.user) {
        currentHousing.hasUser = true;
        currentHousing.isOwner = req.session.user._id == currentHousing.owner._id;
        currentHousing.freePieces = currentHousing.pieces > 0;
        currentHousing.availablePieces = currentHousing.pieces - currentHousing.renters.length;
        currentHousing.hasRented = currentHousing.renters.some(r => r._id == req.session.user._id);
        currentHousing.currentRenters = currentHousing.renters.map(r => r.name).join(', ');
    }

    res.render('details', { title: 'Housing Details' });
});

module.exports = router;