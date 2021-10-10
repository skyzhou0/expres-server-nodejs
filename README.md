# expres-server-nodejs

In this project, we will be looking into how we can use express framework to build a REST API. 

## Project Set up
To initialize the project
```bash
# update npm
sudo npm install -g npm
# To create package.json file, let's run
npm init
# install express module.
npm install express
# check the version and dependecies 
npm list 
# or
npm list --deepth=0
```

# Develope the RESTful API
```bash
node index.js

# test
curl http://localhost:3000
curl http://localhost:3000/api/courses

# install nodemon
sudo npm install -g nodemon
nodemon index.js

# set the port number for the API server. 
const port = process.env.PORT || 3000;
# run
export PORT=5000 
# then the port number will be at 5000 instead of the default 3000.


```

## Input Validation
```bash
npm install joi
```
Not that joi.validate() has been deprecated after version 16. To validate a schema object,
we should use joi object.
```javascript
const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

const result = schema.validate(req.body);
```
