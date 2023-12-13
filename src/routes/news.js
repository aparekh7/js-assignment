const News = require('../controllers/news')

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            let resp = await News.createNews(req.body);
            if (resp.error) {
                return res.status(400).json(resp);
            }
            return res.status(201).end();
        } catch (err) {
            return next(err);
        }
    });

    app.route('/news').get(async (req, res, next) => {
        try {
            let { matchId, tourId, sportId } = req.query

            if (!matchId && !tourId && !sportId) {
                return res.status(400).json({'error': 'One of matchId, tourId or sportId required'});
            }

            let resp = null;
            if (matchId) {
                resp = await News.getNewsByMatchId(matchId);
            }
            else if (tourId) {
                resp = await News.getNewsByTourId(tourId);
            }
            else if (sportId) {
                resp = await News.getNewsBySportId(sportId);
            }

            if (resp == null || resp.length == 0) {
                return res.status(404).end();
            }

            return res.json(resp);
        } catch (err) {
            return next(err);
        }
    });
}