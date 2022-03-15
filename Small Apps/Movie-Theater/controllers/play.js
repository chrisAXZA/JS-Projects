const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { createPlay, updatePlay, deleteById, likePlay } = require('../services/play.js');
const mapErrors = require('../util/mappers.js');

router.get('/create', isUser(), (req, res) => {

    // merges with res.locals !!!
    res.render('create', { title: 'Create Play', play: {} });
});

router.post('/create', isUser(), async (req, res, next) => {
    const play = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        isPublic: Boolean(req.body.isPublic),
        owner: req.session.user._id,
    };

    try {
        await createPlay(play);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Play', play, errors });
    }
});

router.get('/details/:id', preload(true), isUser(), (req, res) => {
    // console.log(res.locals.housing);
    const currentPlay = res.locals.play;

    if (currentPlay.users.length > 0) {
        currentPlay.hasLikes = true;
    } else {
        currentPlay.hasLikes = false;
    }

    if (req.session.user) {
        currentPlay.hasUser = true;
        currentPlay.isOwner = req.session.user._id == currentPlay.owner._id;
        currentPlay.hasLiked = currentPlay.users.some(r => r._id == req.session.user._id);
    }

    res.render('details', { title: 'Play Details' });
});

router.get('/likePlay/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await likePlay(id, req.session.user._id);
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/details/' + id);
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Play' });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    const play = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        imageUrl: req.body.imageUrl.trim(),
        isPublic: Boolean(req.body.isPublic),
    };

    try {
        await updatePlay(id, play);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        play._id = id;
        res.render('edit', { title: 'Edit Play', play, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    // console.log(req.params);
    await deleteById(req.params.id);
    res.redirect('/');
});

router.get('/rent/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await likePlay(id, req.session.user._id);
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/housings/' + id);
    }
});

module.exports = router;