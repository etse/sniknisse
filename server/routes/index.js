var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./database.js');

router.get('/users', function (request, response, error) {
    db.getAllUsers(onSuccess, error);
    
    function onSuccess(result) {
        response.json(result.rows);
    }
});

module.exports = router;
