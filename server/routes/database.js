var pg = require('pg');
var dbpath = process.env.DATABASE_URL || 'postgres://postgres@localhost:5432/sniknisse';

exports.getAllUsers = function(success, error) {
    doQuery("SELECT * FROM users;", null, success, error);
};

function doQuery(query, values, callback, errCb) {
    pg.connect(dbpath, function(err, client, done){
        if(err) {
            done();
            errCb();
        } else {
            client.query(query, values, function(err, result){
                done();
                if(err) {
                    errCb();
                } else {
                    callback(result);
                }
            });
        }
    });
}