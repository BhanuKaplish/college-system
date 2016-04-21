var mongoose = require('mongoose');
    Enrollment = mongoose.model('Enrollment');
    ObjectId = require('mongoose').Types.ObjectId;
    
var getErrorMessage = function(err){
    if(err.errors)
    {
        for (var errName in err.errors){
            if(err.errors[errName].message){
                return err.errors[errName].message;
            }
        }
    }
    else{
        return 'Unknown server error';
    }
};  

exports.create = function(req, res){
    var enrollment = new Enrollment(req.body);
    enrollment.user = req.user;
    enrollment.grade = 0;   
    console.log(req.body);
    enrollment.save(function(err){
        if(err){            
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(enrollment);
        }
    });
};

exports.list = function(req, res){    
    Enrollment.find({ 'user' : new ObjectId(req.user._id)}).populate('course','name').exec(function(err,enrollment){
        console.log(enrollment);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(enrollment);
        }
    });
};

exports.listByCourse = function(req, res, next, id){    
    console.log(id);
    Enrollment.find({ 'course' : new ObjectId(id)}).populate('user').exec(function(err,enrollment){
        console.log(enrollment);
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(enrollment);
        }
    });
};

exports.articleByID = function(req, res, next, id){
    Enrollment.findById(id).populate('creator').populate('course').exec(function(err, enrollment){
        if(err) return next (err);
        if(!enrollment) return next(new Error('Failed to load enrollment' + id));
        
        req.enrollment = enrollment;
        next();
    });
};

exports.read = function(req, res){
    res.json(req.enrollment);
};

exports.update = function(req, res){
    var enrollment = req.enrollment;    
    
    enrollment.grade = req.body.grade;   
     console.log(enrollment);
    
    enrollment.save(function(err){
        console.log(err);
        if(err){
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(enrollment);
        }
    });
};

exports.delete = function(req, res){
    var enrollment = req.enrollment;
    
    enrollment.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(enrollment)
        }
    });
};

exports.hasAuthorization = function(req, res, next){
    if(0 !== req.user.userType){
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};