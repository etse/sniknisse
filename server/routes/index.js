var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./database.js');
var hasher = require('password-hash');

var sessions = {};

router.get('/users', function (request, response, error) {
    db.getAllUsers(onSuccess, error);
    
    function onSuccess(result) {
        response.json(result.rows);
    }
});

router.get('/nissebarn', function(request, response, error) {
    var key = request.get('X-AUTH-TOKEN');
    if(key in sessions) {
        db.getNissebarn(sessions[key].id, onSuccess, error);
    } else {
        response.status(403);
        response.json({message: 'Please log in'});
    }
    
    function onSuccess(result) {
        if(result.rows.length == 0) {
            response.status(204);
            response.json({'message': 'Not assigned'});
        } else {
            response.json(result.rows[0]);
        }
    }    
});

router.get('/onsker', function(request, response, error) {
    var key = request.get('X-AUTH-TOKEN');
    if(key in sessions) {
        response.json({'onsker': sessions[key]['onsker']});
    } else {
        response.status(403);
        response.json({message: 'Please log in'});
    }
});

router.post('/onsker', function(request, response, error) {
    var key = request.get('X-AUTH-TOKEN');
    if(key in sessions) {
        db.updateOnsker(sessions[key].id, request.body.onsker, onSuccess, error);
    } else {
        response.status(403);
        response.json({message: 'Please log in'});
    }

    function onSuccess(result) {
        sessions[key]['onsker'] = request.body.onsker;
        response.json({message: 'updated'});
    }
});

router.post('/login', function(request, response, error) {
    db.getUser(request.body.email, onSuccess, error);
    
    function onSuccess(result) {
        if(result.rows.length != 1) {
            response.status(403);
            response.json({'error': "Wrong username or password!"});
        } else {
            var password = request.body.password;
            var hashedPassword = result.rows[0]['password'];
            var sessionId = hasher.generate(result.rows[0]['id'].toString() + Date.now());
            sessions[sessionId] = result.rows[0];
            response.json({'auth-token': sessionId});
        }
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
