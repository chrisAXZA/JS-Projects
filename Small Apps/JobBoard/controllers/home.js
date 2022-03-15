const router = require('express').Router();

const { isUser } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { getAllAds, searchAds, getHomeAdsNewest } = require('../services/ad.js');

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

module.exports = router;