const router = require('express').Router();

const { isUser } = require('../middleware/guards.js');
const preload = require('../middleware/preload.js');
const { getAllTrips, tripsByUser } = require('../services/trip.js');

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

module.exports = router;