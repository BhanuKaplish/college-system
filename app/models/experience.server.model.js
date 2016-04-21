var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
     var ExperienceSchema = new Schema({
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
    
    /*
    var ExperienceSchema = new Schema({
        created: {
            type: Date,
            default: Date.now
        },
        company_name: {
            type: String,
            default: '',
            trim: true,
            required: 'Company Name Cannot be blank'
        },
        city: {
            type: String,
            default: '',
            trim: true,
            required: 'City cannot be blank'
        },       
        country: {
            type: String,
            default: '',
            trim: true,
            required: 'Country cannot be blank'
        },
         position: {
            type: String,
            default: '',
            trim: true,
            required: 'Position cannot be blank'
        },
        start_date: {
            type: Date,
            default: '',
            trim: true,
            required: 'Start Date cannot be blank'
        },
        end_date: {
            type: Date,
            default: '',
            trim: true,
            required: 'End Date cannot be blank'
        },
        details: {
            type: String,
            default: '',
            trim: true
        },
        creator: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    });*/
    
    mongoose.model('Experience', ExperienceSchema);