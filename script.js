
const mongoose = require('mongoose')
const Schema = require('./Schema/Schema');
const Course = require('./Schema/Schema');
const insertData = require('./Insertion/data');
const router = require('./Routes/routes')
const express = require('express')


const app = express();
app.use(express.json());
app.use('/', router);


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


app.listen(3000, () => {
  console.log("Server has started")
})
