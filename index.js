// Modules import.
const Joi = require("joi");
const express = require("express");
const schemaValidation = require("./schemaValidation");
const app = express();

// Allow the app to use express json input.
app.use(express.json());

// Simulated database array
const courses = [
    { id: 1, name: "course1"},
    { id: 2, name: "course2"},
    { id: 3, name: "course3"},
];

// Root api endpoint
app.get('/', (req, res) => {
    res.send({"message": "hello nodemon"});
});

// Get courses request
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Post request
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

// Validated Input Post request
app.post('/api/courses_validate', (req, res) => {
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

// Put request
app.put('/api/courses/:id', (req, res) => {
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

})

// Route parameters
app.get('/api/posts/:year/:month', (req, res) => {
    // res.send(req.params.year);
    res.send(req.params);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send("couse not found!");
        return;
    };
    res.send(course);
});



const port = process.env.PORT || 3000;

// app.listen(3000, () => console.log('Listen on port 3000 ....'));
app.listen(port, () => console.log(`Listen on port ${port} ....`));


// function inputSchemaValidation(courseName) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });

//     return result = schema.validate(courseName);
//     // console.log(result);
// };