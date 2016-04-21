var users = require('../../app/controllers/users.server.controller'),
    enrollment = require('../../app/controllers/enrollment.server.controller');
    
module.exports = function(app){
    app.route('/api/enrollment')
       .get(users.requiresLogin,enrollment.list)
       .post(users.requiresLogin, enrollment.create);
       
    app.route('/api/enrollment/:enrollmentId')
       .get(users.requiresLogin,enrollment.read)
       .put(users.requiresLogin, enrollment.hasAuthorization, enrollment.update)
       .delete(users.requiresLogin, enrollment.hasAuthorization, enrollment.delete);
       
       app.param('enrollmentId', enrollment.articleByID);
       
    app.route('/api/enrollmentcourse/:courseId')
       .get(users.requiresLogin,enrollment.read);
       
       app.param('courseId', enrollment.listByCourse)
}