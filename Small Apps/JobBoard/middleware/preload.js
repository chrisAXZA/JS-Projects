const playService = require('../services/ad.js');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (populate) {
            res.locals.ad = await playService.getAdsAndUsers(id);
        } else {
            res.locals.ad = await playService.getAdById(id);
        }

        next();
    };
}

module.exports = preload;