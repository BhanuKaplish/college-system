var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
    var CourseSchema = new Schema({
        created: {
            type: Date,
            default: Date.now
        },
        name: {
            type: String,
            default: '',
            trim: true,
            required: 'Name Cannot be blank'
        },
        code: {
            type: String,
            default: '',
            trim: true,
            required: 'Code Cannot be blank'
        },        
        professor: {
            type: String,
            default: '',
            trim: true,
            required: 'Professor Cannot be blank'
        }      
    });
    
    mongoose.model('Course', CourseSchema);