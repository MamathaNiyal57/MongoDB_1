const mongoose = require('mongoose')
const {Course} = require('../Schema/Schema');
const { CourseLevel, validNames } = require('../Schema/Schema');

const fs = require('fs');
const csv = require('csv-parser');

console.log(Course)
async function insertData(filename) {
    try{
        const validNames = {
            [CourseLevel.SSC]: [ 'Maths','Science','English' ],
            [CourseLevel.Inter] : ['MPC','BiPC','CEC','MEC'],
            [CourseLevel.Diploma] : ['IT','ECE'],
            [CourseLevel.Degree] : ['BCom','BSc'],
            [CourseLevel.Engineering] : ['CSE','ECE','EEE'],
            [CourseLevel.Medical] : ['MBBS','BPharm'],
        };
        const results = [];
        const stream = fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                for(const row of results ){
                    const courseLevel = row.course_level.trim().toLowerCase();
                    const courseName = row.name.trim();
                    const prerequisiteLevel = row.p_level ? row.p_level.trim().toLowerCase() : '';
                    const prerequisiteName = row.p_name ? row.p_name.trim() : '';

                    console.log(validNames[courseLevel]);
                    console.log(courseName)
                    if(!validNames[courseLevel] || !validNames[courseLevel].includes(courseName)){
                        throw new Error(`Invalid course name '${courseName}' for the selected level '${courseLevel}'`);

                    }

                    const course = await Course.create(
                        {name : courseName, course_level: courseLevel},
                        // {name: courseName, course_level: courseLevel},
                        // {upsert: true , new : true}
                    );

                    if (prerequisiteName && prerequisiteLevel) {
                        const prerequisiteCourse = await Course.findOne({
                          name: prerequisiteName,
                          course_level: prerequisiteLevel,
                        });
                    if (prerequisiteCourse) {
                        course.prerequisite.push(prerequisiteCourse._id);
                        await course.save();
                      }
                      else{
                        course.prerequisite=[prerequisiteLevel];
                     }

                    }
                }
                console.log('Data insertion done');
            });
    }catch(error){
        console.error('Error inserting data:', error.message);
    }
}
module.exports = insertData;