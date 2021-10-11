const express = require("express");
const router = express.Router();

// Root api endpoint
router.get('/', (req, res) => {
    res.send({"message": "hello nodemon"});
});

module.exports = router;