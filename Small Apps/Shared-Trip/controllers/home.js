const { isUser } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { getMostLikedPlay, getPlaysByDate, getAllHousings, getHousingsBySearch, getAllTrips, tripsByUser } = require('../services/trip.js');

const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});


router.get('/sharedTrips', async (req, res) => {
    let trips = await getAllTrips();

    res.render('sharedTrips', { title: 'Shared Trips', trips });
});

router.get('/profile', preload(), isUser(), async (req, res) => {
    const userId = res.locals.user._id;

    let trips = await tripsByUser(userId);

    trips = trips.filter(t => t.buddies.some(b => b._id == userId));

    res.locals.user.tripsCount = trips.length;
    res.locals.user.trips = trips;
    console.log(res.locals.user);
    console.log(res.locals.trip);

    res.render('profile', { title: 'Profile Page' });
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

router.get('/search', preload(), isUser(), async (req, res) => {
    console.log(req.query);

    let housings = [];

    if (req.query.text != '') {
        housings = await getHousingsBySearch(req.query.text);
    }

    res.render('search', { title: 'Search Page', housings });
});

module.exports = router;