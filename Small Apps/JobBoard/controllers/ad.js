const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { createPlay, updatePlay, deleteById, likePlay, createAd, joinAd, updateAd } = require('../services/ad.js');
const mapErrors = require('../util/mappers.js');

router.get('/create', isUser(), (req, res) => {
    // merges with res.locals !!!
    res.render('create', { title: 'Create Ad', ad: {} });
});

router.post('/create', isUser(), async (req, res, next) => {
    console.log(req.body);

    const ad = {
        headline: req.body.headline.trim(),
        location: req.body.location.trim(),
        companyName: req.body.companyName.trim(),
        description: req.body.description,
        owner: req.session.user._id,
    };

    try {
        await createAd(ad);
        res.redirect('/allAds');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Ad', ad, errors });
    }
});

router.get('/details/:id', preload(true), (req, res) => {
    const currentAd = res.locals.ad;

    if (currentAd.users.length > 0) {
        currentAd.hasCandidates = true;
    } else {
        currentAd.hasCandidates = false;
    }

    if (req.session.user) {
        console.log(currentAd);
        currentAd.candidates = currentAd.users.length;
        currentAd.hasUser = true;
        currentAd.isOwner = req.session.user._id == currentAd.owner._id;
        currentAd.hasUser = true;
        currentAd.hasJoined = currentAd.users.some(r => r._id == req.session.user._id);
    }

    res.render('details', { title: 'Ad Details' });
});

router.get('/joinAd/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinAd(id, req.session.user._id);
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/details/' + id);
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Ad' });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    const ad = {
        headline: req.body.headline.trim(),
        location: req.body.location.trim(),
        companyName: req.body.companyName.trim(),
        description: req.body.description.trim(),
    };

    try {
        await updateAd(id, ad);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        ad._id = id;
        res.render('edit', { title: 'Edit Ad', play: ad, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/allAds');
});

module.exports = router;