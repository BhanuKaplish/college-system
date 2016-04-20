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
    enrollment.creator = req.user;
    
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
    Enrollment.find({ 'creator' : new ObjectId(req.user._id)}).sort('-created').populate('-creator', 'firstName lastName fullName').exec(function(err,enrollment){
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
    Enrollment.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, enrollment){
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
    
    enrollment.company_name = req.body.company_name;    
    enrollment.city = req.body.city;    
    enrollment.country = req.body.country;
    enrollment.position = req.body.position;    
    enrollment.start_date = req.body.start_date;
    enrollment.end_date = req.body.end_date;   
    enrollment.details = req.body.details;
    
    enrollment.save(function(err){
        if(err){
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
    if(req.enrollment.creator.id !== req.user.id){
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};