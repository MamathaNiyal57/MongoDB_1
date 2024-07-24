const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// const CourseLevel = require('../enum')
// const validNames = require('../enum')
//import { courseLevel, validNames} from '../enum';

const CourseLevel = {
    SSC : "ssc",
    Inter : 'inter',
    Diploma : 'diploma',
    Engineering : 'engineering',
    Degree : 'degree',
    Medical : 'medical',
}
const validNames = {
    [CourseLevel.SSC]: [ 'Maths','Science','English' ],
    [CourseLevel.Inter] : ['MPC','BiPC','CEC','MEC'],
    [CourseLevel.Diploma] : ['IT','ECE'],
    [CourseLevel.Degree] : ['BCom','BSc'],
    [CourseLevel.Engineering] : ['CSE','ECE','EEE'],
    [CourseLevel.Medical] : ['MBBS','BPharm'],
}

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validator:  {
            validator: function(value) {
                const courseLevel = this.course_level;
                return validNames[courseLevel] ? validNames[courseLevel].includes(value) : false;
            },
            message: 'Invalid course name for the selected level.',
        } 
    },
    course_level:{
        type: String,
        required: true,
        enum: Object.values(CourseLevel)

    },
    prerequisite: [{
        type: mongoose.SchemaTypes.ObjectId ,
        ref: 'Course',
        required: true,
    } ]
})

const Course = mongoose.model('Course', courseSchema);
// module.exports = Course;

module.exports = {CourseLevel, validNames,Course };




