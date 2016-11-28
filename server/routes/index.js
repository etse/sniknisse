var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('./database.js');
var hasher = require('password-hash');
var shuffle = require('shuffle-array');
var q = require('q');

var sessions = {};

function isLoggedInAsAdmin(auth) {
    return (auth in sessions && sessions[auth].id <= 2);
}

router.param('userid', function(req, res, next, userid){
    req.userid = userid;
    console.log("Param?", userid);
    next();
});

router.get('/users', function (request, response, error) {
    if(isLoggedInAsAdmin(request.get('X-AUTH-TOKEN'))) {
        db.getAllUsersUnfiltered(onSuccess, error);
    } else {
        db.getAllUsers(onSuccess, error);
    }
    
    function onSuccess(result) {
        response.json(result.rows);
    }
});

router.post('/users/:userid', function(request, response, error){
    if(isLoggedInAsAdmin(request.get('X-AUTH-TOKEN'))) {
        var status = request.body.levert;
        var userid = request.userid;
        console.log("sett levert?", userid, status);
        db.settLevert(userid, status, onSuccess, error);
    } else {
        response.status(403);
        response.json({message: 'Please log in'});
    }

    function onSuccess() {
        response.json({message: "ok"});
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

router.post('/nissebarn', function(request, response, error) {
    var key = request.get('X-AUTH-TOKEN');
    if(isLoggedInAsAdmin(key)) {
        db.getAllUsersUnfiltered(onHentetAlleBrukere, error);            
    } else {
        response.status(403);
        response.json({message: 'Please log in'});
    }
    
    function onHentetAlleBrukere(result) {
        var folkHasle = result.rows.filter(function(row) {
            return row.lokasjon == 2;
        });
        var folkS2WT = result.rows.filter(function(row) {
            return row.lokasjon == 1;
        });

        var promises = shuffleUsers(folkHasle);
        promises = promises.concat(shuffleUsers(folkS2WT));

        q.all(promises).then(function(){
            response.json({message: "users assigned"});
        }).catch(function(error){
            response.status(500);
            response.message({error: error});
        });

        function shuffleUsers(users) {
            var shuffeled = shuffle(users);
            var count = shuffeled.length;
            var promises = [];
            for(i=0; i<count; i++) {
                var deferer = q.defer();
                db.updateNissebarn(shuffeled[i%count].id, shuffeled[(i+1)%count].id, deferer.resolve, deferer.reject);
                promises.push(deferer.promise);
            }
            return promises;
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
    db.getUser(request.body.email.toLowerCase(), onSuccess, error);
    
    function onSuccess(result) {
        if(result.rows.length != 1) {
            respondWrongCredentials();
        } else {
            var password = request.body.password;
            var hashedPassword = result.rows[0]['password'];
            if(hasher.verify(password, hashedPassword)) {
                var sessionId = hasher.generate(result.rows[0]['id'].toString() + Date.now());
                sessions[sessionId] = result.rows[0];
                response.json({'auth-token': sessionId});
            } else {
                respondWrongCredentials();
            }
        }
    }

    function respondWrongCredentials() {
        response.status(403);
        response.json({'error': "Wrong username or password!"});
    }
});

router.post('/users', function(request, response, error) {   
    var hashedPassword = hasher.generate(request.body.password);
    db.createUser(request.body.name, request.body.email, hashedPassword, request.body.onsker, request.body.lokasjon, onSuccess, error);
    
    function onSuccess(result) {
        response.json({status: 'OK'});
    }
});

module.exports = router;
