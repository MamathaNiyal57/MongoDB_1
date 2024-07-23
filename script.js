
const mongoose = require('mongoose')
const Schema = require('./Schema/Schema');
const Course = require('./Schema/Schema');
const insertData = require('./Insertion/data');

async function connect(){
try {
    await mongoose.connect('mongodb://localhost/Mamathadb');
    console.log("Connected successfully")
  } catch (error) {
    handleError(error);
  }
}
connect()
insertData('./Data/CourseData.csv')


//ssc,Maths
//ssc,English