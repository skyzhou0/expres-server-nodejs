const Joi = require("joi");


function inputSchemaValidation(courseName) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return result = schema.validate(courseName);
    // console.log(result);
};

module.exports.inputSchemaValidation = inputSchemaValidation;