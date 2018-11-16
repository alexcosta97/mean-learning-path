var config = require('./config'),
mongoose = require('mongoose');


//Uses mongoose and config to connect to the database and returns the database object.
module.exports = function(){
    var db = mongoose.connect(config.db);
    require('../app/models/user.server.model');
    return db;
}