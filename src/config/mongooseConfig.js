const mongoose = require('mongoose');

const { DB_Connection_String } = require('../constans');

function initDatabase() {
    return mongoose.connect(DB_Connection_String);
}

module.exports = initDatabase;