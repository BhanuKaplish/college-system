var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
    var EnrollmentSchema = new Schema({
        created: {
            type: Date,
            default: Date.now
        },        
        course: {
            type: Schema.ObjectId,
            ref: 'Course'
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        grade: {
            type: Number,
            required: 'Grade Cannot be blank'
        }, 
    });
    
    mongoose.model('Enrollment', ExperienceSchema);