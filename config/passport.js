// pre middleware  -  It is used for saving something to the database and then saving it, whereas
// post middleware  - It is used for saving the database first and then adding the something to database 


var passport = require('passport'),
    mongoose = require('mongoose');
module.exports = function () {
    var User = mongoose.model('User');
    passport.serializeUser(function (user, done) {   
        done(null, user.id);                            
    });
    passport.deserializeUser(function (id, done) {   
        User.findOne({
            _id: id                                         
        }, '-password -salt', function (err, user) {     
            done(err, user);
        });
    });
    require('./strategies/local.js')();            
    require('./strategies/facebook.js')();
};
