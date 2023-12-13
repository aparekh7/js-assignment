const Tour = require('../models/tour');
const Match = require('../models/match');
const News = require('../models/news')

const createNews = async newsRequest => {

    let { title, description, tourId, matchId } = newsRequest;
    let sportId = null;

    if (!matchId && !tourId) {
        return {'error': 'Missing required parameter: matchId or tourId should be present'};
    }

    if (matchId && !tourId) {
        tourId = await Match.getTourIdById(matchId);
        if (tourId.length == 0) {
            return {'error': 'Match not found'};
        }
        tourId = tourId[0]['tourId'];
        sportId = (await Tour.getSportIdById(tourId))[0]['sportId'];
    }
    else if (!matchId && tourId) {
        sportId = await Tour.getSportIdById(tourId);
        if (sportId.length == 0) {
            return {'error': 'Tour not found'};
        }
        sportId = sportId[0]['sportId'];
    }
    else if (matchId && tourId) {
        matchTourId = await Match.getTourIdById(matchId);
        if (matchTourId.length == 0) {
            return {'error': 'Match not found'};
        }
        matchTourId = matchTourId[0]['tourId'];

        if (matchTourId != tourId) {
            return {'error': 'Match does not belong to the Tour'};
        }

        sportId = (await Tour.getSportIdById(tourId))[0]['sportId'];
    }

    data = { title, description, matchId, tourId, sportId };
    try {
        await News.createNews(data);
    } catch (error) {
        console.error('Unable to create News!');
        return {'error': "Unable to create News!"};
    }

    return {'status': 'Success'};
}

const getNewsByMatchId = async matchId => {
    return await News.getNewsByMatchId(matchId);
}

const getNewsByTourId = async tourId => {
    return await News.getNewsByTourId(tourId);
}

const getNewsBySportId = async sportId => {
    return await News.getNewsBySportId(sportId);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}
