var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/test', function (req, res) {
    res.json({result: "OK"});
});


module.exports = router;
