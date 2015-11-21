var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./database.js');
var hasher = require('password-hash');

router.get('/users', function (request, response, error) {
    db.getAllUsers(onSuccess, error);
    
    function onSuccess(result) {
        response.json(result.rows);
    }
});

router.get('/nissebarn', function(request, response, error) {
    db.getNissebarn(1, onSuccess, error);
    
    function onSuccess(result) {
        response.json(result.rows);
    }    
});

router.post('/login', function(request, response, error) {
    db.getUser(request.body.email, onSuccess, error);
    
    function onSuccess(result) {
        
    } 
});

router.post('/users', function(request, response, error) {   
    var hashedPassword = hasher.generate(request.body.password);
    db.createUser(request.body.name, request.body.email, hashedPassword, request.body.onsker, onSuccess, error);
    
    function onSuccess(result) {
        response.json({status: 'OK'});
    }
});

module.exports = router;
