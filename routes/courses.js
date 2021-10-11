const schemaValidation = require("../schemaValidation");
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Simulated database array
const courses = [
    { id: 1, name: "course1"},
    { id: 2, name: "course2"},
    { id: 3, name: "course3"},
];

// 1. Get courses request
router.get('/', (req, res) => {
    res.send(courses);
});

// Post request
// router.post('/', (req, res) => {
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     };

//     courses.push(course);
//     res.send(course);
// });

// 2. Validated Input Post request
router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    };

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

// 3. Put request
router.put('/:id', (req, res) => {
    //look for the course, if not exist, return 404.
    // const id = parseInt(req.params.id);
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if (!course)  {
        res.status(404).send("couse not found!");
        return;
    };
    
    // Validate if invalid, return 400 - bad request.
    const { error } = schemaValidation.inputSchemaValidation(req.body);
    console.log(error);

    if (error) {
        res.status(400).send(error.details[0].message)
    };

    // Update course, return the updated course
    course.name = req.body.name;
    res.send(course);

});

// 4. Deletion request
router.delete('/:id', (req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send("couse not found!");
        return;
    };

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


module.exports = router;