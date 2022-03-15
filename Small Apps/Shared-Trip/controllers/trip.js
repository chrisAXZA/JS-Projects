const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { createTrip, joinTrip, updateTrip, deleteById, likePlay } = require('../services/trip.js');
const mapErrors = require('../util/mappers.js');

router.get('/create', isUser(), (req, res) => {
    // merges with res.locals !!!
    res.render('create', { title: 'Create Trip', play: {} });
});

router.post('/create', isUser(), async (req, res, next) => {
    console.log(req.body);

    const trip = {
        startPoint: req.body.startPoint.trim(),
        endPoint: req.body.endPoint.trim(),
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        imageUrl: req.body.imageUrl.trim(),
        carBrand: req.body.carBrand.trim(),
        seats: req.body.seats.trim(),
        price: req.body.price.trim(),
        description: req.body.description.trim(),
        owner: req.session.user._id,
    };

    try {
        await createTrip(trip);
        res.redirect('/sharedTrips');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Trip', trip, errors });
    }
});

router.get('/details/:id', preload(true), (req, res) => {
    const currentTrip = res.locals.trip;

    currentTrip.buddiesList = currentTrip.buddies.map(b => b.email).join(', ');

    if (req.session.user) {
        currentTrip.hasUser = true;
        currentTrip.isOwner = req.session.user._id == currentTrip.owner._id;
        currentTrip.remainingSeats = currentTrip.seats - currentTrip.buddies.length;
        currentTrip.freeSeats = currentTrip.remainingSeats > 0;
        currentTrip.hasJoined = currentTrip.buddies.some(r => r._id == req.session.user._id);
    }

    res.render('details', { title: 'Trip Details' });
});

router.get('/joinTrip/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await joinTrip(id, req.session.user._id);
    } catch (error) {
        console.log(error);
    } finally {
        res.redirect('/details/' + id);
    }
});

router.get('/edit/:id', preload(false), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Trip' });
});

router.post('/edit/:id', preload(false), isOwner(), async (req, res) => {
    console.log(req.body);
    const id = req.params.id;

    const trip = {
        startPoint: req.body.startPoint.trim(),
        endPoint: req.body.endPoint.trim(),
        date: req.body.date.trim(),
        time: req.body.time.trim(),
        imageUrl: req.body.imageUrl.trim(),
        carBrand: req.body.carBrand.trim(),
        seats: req.body.seats.trim(),
        price: req.body.price.trim(),
        description: req.body.description.trim(),
    };

    try {
        await updateTrip(id, trip);
        res.redirect('/details/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        trip._id = id;
        res.render('edit', { title: 'Edit Trip', play: trip, errors });
    }
});

router.get('/delete/:id', preload(false), isOwner(), async (req, res) => {
    // console.log(req.params);
    await deleteById(req.params.id);
    res.redirect('/sharedTrips');
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