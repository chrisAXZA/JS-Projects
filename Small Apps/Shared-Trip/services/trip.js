const Trip = require('../models/Trip.js');
const User = require('../models/User.js');

async function getAllTrips() {
    return Trip.find({}).lean();
}

async function createTrip(play) {
    const result = new Trip(play);
    await result.save();
}

async function getTripAndUsers(id) {
    return Trip.findById(id).populate('buddies').populate('owner').lean();
}

async function getTripById(id) {
    return Trip.findById(id).lean();
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);

    if (trip.buddies.includes(userId)) {
        throw new Error('User has already joined given trip!');
    }

    trip.buddies.push(userId);
    await trip.save();
}

async function deleteById(id) {
    await Trip.findByIdAndDelete(id);
}

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.startPoint = trip.startPoint;
    existing.endPoint = trip.endPoint;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.imageUrl = trip.imageUrl;
    existing.carBrand = trip.carBrand;
    existing.seats = Number(trip.seats);
    existing.price = Number(trip.price);

    await existing.save();
}

async function tripsByUser(userId) {
    const trips = await Trip.find({ owner: userId }).lean();

    return trips;
}

module.exports = {
    getAllTrips,
    createTrip,
    getTripAndUsers,
    getTripById,
    joinTrip,
    updateTrip,
    deleteById,
    tripsByUser,
};