var users = require('../../app/controllers/users.server.controller'),
    experience = require('../../app/controllers/experiences.server.controller');
    
module.exports = function(app){
    app.route('/api/experiences')
       .get(users.requiresLogin,experience.list)
       .post(users.requiresLogin, experience.create);
       
    app.route('/api/experiences/:experienceId')
       .get(users.requiresLogin,experience.read)
       .put(users.requiresLogin, experience.hasAuthorization, experience.update)
       .delete(users.requiresLogin, experience.hasAuthorization, experience.delete);
       
       app.param('experienceId', experience.articleByID)
}