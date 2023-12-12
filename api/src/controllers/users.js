var db = require('./dbConnection');
var helper = require('../helpers/helper');

module.exports.createUser = function (data, callback) {
    let table = 'users';
    let tableAbbreviation = 'usr';
    let query = 'SELECT COUNT(*) AS count FROM ' + table;

    db.get(query, (err, row) => { 
        if(err) {
            console.error(err);
            return;
        } 

        let nextId = helper.defineNextId(tableAbbreviation, row.count);

        data.arrival_date = data.arrival_date === undefined ? null : data.arrival_date;

        db.run("INSERT INTO users(usr_id, name, email, promotion, arrival_date, room, password) VALUES(?, ?, ?, ?, ?, ?, ?)", [
            nextId,
            data.name,
            data.email,
            data.promotion,
            data.arrival_date, 
            data.room,
            data.password
        ], (err) => {
            if(err) {
                console.error(err);
                callback('Missing parameter.');
                db.close();
                return;
            }

            db.close();
            callback(null);
        });
    });
}