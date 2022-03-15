const playService = require('../services/play.js');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (populate) {
            res.locals.play = await playService.getPlayAndUsers(id);
        } else {
            res.locals.play = await playService.getPlayById(id);
        }

        next();
    };
}

module.exports = preload;