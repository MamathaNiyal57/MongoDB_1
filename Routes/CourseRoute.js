
const express = require('express')
const { Course } =require('../Schema/Schema')

const courseRouter = express.Router();


//Routes to fetch all courses

courseRouter.get('/', async (req, res) => {
    try{
        const courses = await Course.find()
        res.send(courses)
    }catch(e){
        res.send("Error:", e)
    }
})

// Route to fetch a single course by ID
courseRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findById(id).populate("prerequisite");
        if (!course) {
            return res.send("Course not found");
        }
        res.send(course);
    } catch (e) {
        console.error("Error:", e);
        res.status(500).send("Internal Server Error");
    }
});
// Route to update a course by ID
courseRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCourse) {
            return res.send("Course not found");
        }
        res.send(updatedCourse);
    } catch (e) {
        console.error("Error:", e);
        res.send("Internal Server Error");
    }
});





module.exports = courseRouter;

