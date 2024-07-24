const express = require('express')
const  courseRouter  = require('../Routes/CourseRoute')
const router = express.Router()

module.exports = router;


router.use('/courses',courseRouter);

