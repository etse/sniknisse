var pg = require('pg');
var dbpath = process.env.DATABASE_URL || 'postgres://localhost:5432/sniknisse';

exports.getAllUsers = function(success, error) {
    doQuery("SELECT name, email, onsker, lokasjon FROM users ORDER BY id;", null, success, error);
};

exports.getAllUsersUnfiltered = function(success, error) {
    doQuery("SELECT * FROM users ORDER BY id;", null, success, error);
};

exports.settLevert = function(userId, status, success, error) {
    doQuery("UPDATE users SET harlevert=$2 WHERE id=$1", [userId, status], success, error);
};

exports.getUser = function(email, success, error) {
    doQuery("SELECT * FROM users WHERE email=$1", [email], success, error);
};

exports.updateOnsker = function(userId, onsker, success, error) {
    doQuery("UPDATE users SET onsker=$2 WHERE id=$1", [userId, onsker], success, error);
};

exports.updateNissebarn = function(userId, nissebarnId, success, error) {
    doQuery("UPDATE users SET nissebarn=$2 WHERE id=$1", [userId, nissebarnId], success, error);
};

exports.getNissebarn = function(userid, success, error) {
    doQuery("SELECT name, onsker FROM users WHERE id=(SELECT nissebarn FROM users WHERE id=$1)", [userid], success, error);
};

exports.createUser = function(name, email, password, onsker, lokasjon, success, error) {
    doQuery("INSERT INTO users(name, email, password, onsker, lokasjon) VALUES ($1, $2, $3, $4, $5);", 
        [name, email, password, onsker, lokasjon], success, error);
};

function doQuery(query, values, callback, errCb) {
    pg.connect(dbpath, function(err, client, done){
        if(err) {
            done();
            errCb(err);
        } else {
            client.query(query, values, function(err, result){
                done();
                if(err) {
                    errCb(err);
                } else {
                    callback(result);
                }
            });
        }
    });
}