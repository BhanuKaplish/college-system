var mongoose = require('mongoose');
    Experience = mongoose.model('Experience');
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
    var experience = new Experience(req.body);
    experience.creator = req.user;
    
    experience.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
            res.json(experience);
        }
    });
};

exports.list = function(req, res){    
    Experience.find({ 'creator' : new ObjectId(req.user._id)}).sort('-created').populate('-creator', 'firstName lastName fullName').exec(function(err,experience){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(experience);
        }
    });
};

exports.articleByID = function(req, res, next, id){
    Experience.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, experience){
        if(err) return next (err);
        if(!experience) return next(new Error('Failed to load experience' + id));
        
        req.experience = experience;
        next();
    });
};

exports.read = function(req, res){
    res.json(req.experience);
};

exports.update = function(req, res){
    var experience = req.experience;    
    
    experience.company_name = req.body.company_name;    
    experience.city = req.body.city;    
    experience.country = req.body.country;
    experience.position = req.body.position;    
    experience.start_date = req.body.start_date;
    experience.end_date = req.body.end_date;   
    experience.details = req.body.details;
    
    experience.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience);
        }
    });
};

exports.delete = function(req, res){
    var experience = req.experience;
    
    experience.remove(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(experience)
        }
    });
};

exports.hasAuthorization = function(req, res, next){
    if(req.experience.creator.id !== req.user.id){
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};