var db = require('./dbConnection');
var helper = require('../helpers/hController');

module.exports.createUser = function (user, callback) {
    let table = 'users';
    let tableAbbreviation = 'usr';
    let query = 'SELECT COUNT(*) AS count FROM ' + table;

    db.get(query, (err, row) => { 
        if(err) {
            console.error(err);
            return;
        } 

        let nextId = helper.defineNextId(tableAbbreviation, row.count);

        user.arrival_date = user.arrival_date === undefined ? null : user.arrival_date;

        db.run("INSERT INTO users(usr_id, name, email, promotion, arrival_date, room, password) VALUES(?, ?, ?, ?, ?, ?, ?)", [
            nextId,
            user.name,
            user.email,
            user.promotion,
            user.arrival_date, 
            user.room,
            user.password
        ], (err) => {
            if(err) {
                console.error(err);
                callback('Null parameter has sended.');
                return;
            }
            db.close();
            callback(null);
        });
    });
}

module.exports.auth = function (user, callback) {
    let query = 'SELECT usr_id AS uid FROM users WHERE name = ? AND password = ?';
    db.get(query, [user.name, user.password], (err, row) => {
        if(err) {
            console.error(err);
            callback('Null parameter has sended.', null);
            return;
        }
        callback(row.uid);
    })
}