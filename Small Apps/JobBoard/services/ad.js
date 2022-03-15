const Ad = require('../models/Ad.js');
const User = require('../models/User.js');

async function createAd(ad) {
    const result = new Ad(ad);
    await result.save();
}
async function getHomeAds() {
    return Ad.find({}).limit(3).lean();
}

async function getHomeAdsNewest() {
    return Ad.find({}).sort({ createdAt: 1 }).limit(3).lean();
}

async function getAllAds() {
    return Ad.find({}).lean();
}

async function getAllAdsAndOwners() {
    return Ad.find({}).populate('owner').lean();
}

async function getAdsAndUsers(id) {
    return Ad.findById(id).populate('users').populate('owner').lean();
}

async function getAdById(id) {
    return Ad.findById(id).lean();
}

async function joinAd(adId, userId) {
    const ad = await Ad.findById(adId);

    if (ad.users.includes(userId)) {
        throw new Error('User has already joined given ad!');
    }

    ad.users.push(userId);
    await ad.save();
}

async function updateAd(id, play) {
    const existing = await Ad.findById(id);

    existing.headline = play.headline;
    existing.location = play.location;
    existing.companyName = play.companyName;
    existing.description = play.description;

    await existing.save();
}

async function deleteById(id) {
    await Ad.findByIdAndDelete(id);
}

async function searchAds(text) {
    let allAds = await getAllAdsAndOwners();

    allAds = allAds.filter(a => a.owner.email == text.toLowerCase());

    return allAds;
}

module.exports = {
    getHomeAdsNewest,
    createAd,
    getHomeAds,
    getAllAds,
    getAdsAndUsers,
    getAdById,
    joinAd,
    updateAd,
    deleteById,
    searchAds,
};