const Play = require('../models/Play.js');
const User = require('../models/User.js');

async function getPlaysGuest() {
    return Play.find({ isPublic: true }).sort({ users: -1 }).limit(3).lean();
}

async function getPlaysUser() {
    return Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

async function createPlay(play) {
    const result = new Play(play);
    await result.save();
}

async function getPlayById(id) {
    return Play.findById(id).lean();
}

async function getPlayAndUsers(id) {
    return Play.findById(id).populate('users').lean();
}

async function likePlay(playId, userId) {
    const play = await Play.findById(playId);

    if (play.users.includes(userId)) {
        throw new Error('User has already liked given play!');
    }

    play.users.push(userId);
    await play.save();
}

async function updatePlay(id, play) {
    const existing = await Play.findById(id);

    existing.title = play.title;
    existing.description = play.description;
    existing.imageUrl = play.imageUrl;
    existing.isPublic = play.isPublic;

    await existing.save();
}

async function deleteById(id) {
    await Play.findByIdAndDelete(id);
}

async function getPlaysByDate() {
    // return Play.find().sort({ createdAt: -1 }).lean();
    return Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

async function getMostLikedPlay() {
    // return Play.find().sort({ createdAt: -1 }).lean();
    return Play.find({ isPublic: true }).sort({ users: -1 }).lean();
}

module.exports = {
    getPlaysGuest,
    getPlaysUser,
    createPlay,
    getPlayById,
    getPlayAndUsers,
    likePlay,
    updatePlay,
    deleteById,
    getPlaysByDate,
    getMostLikedPlay,
};