const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getTourIdById = async id => {
    const statement = 'select tourId from matches where id = ?';
    const parameters = [ id ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllMatches: getAllMatches,
    getTourIdById: getTourIdById
}