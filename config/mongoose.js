var config = require('./config'),
mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db); // calling config.db of mongoose
    
    require('../app/models/user.server.model');
    require('../app/models/experience.server.model')
    
    return db;
};