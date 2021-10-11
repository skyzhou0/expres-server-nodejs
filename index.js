// Modules import.
const Joi = require("joi");
const express = require("express");
const course_routers = require('./routes/courses');
const hone_routers = require('./routes/home');
const schemaValidation = require("./schemaValidation");
const app = express();

// Allow the app to use express json input.
app.use(express.json());
app.use('/api/courses', course_routers);
app.use('/', hone_routers);


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