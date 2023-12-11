var db = require('./dbConnection');
var helper = require('../helpers/helper');

function countTableRow(db) {
    db.get('SELECT COUNT(*) AS count FROM users', (err, row) => { 
        if(err) {
            console.error(err);
            return;
        }

        return row.count;
    });
}

function defineNextID(digitsNumber, rowCount) {
    let usrIdPart;

    if(digitsNumber == 1) usrIdPart = 'usr-00'; 
    else if (digitsNumber == 2) usrIdPart = 'usr-0'; 
    else if (digitsNumber == 3) usrIdPart = 'usr-'; 
    else  return;

    return usrIdPart + (rowCount + 1);
}

module.exports.createUser = (userObject) => {
    let rowCount = countTableRow(db);

    if(rowCount === undefined ) {
        console.log('Table users is full.');
        return 500;
    }

    
    let digitsNumber = helper.countDigits(rowCount);
    let user_id = defineNextID(digitsNumber, rowCount);


    userObject.arrival_date = userObject.arrival_date === undefined ? '' : userObject.arrival_date;
    db.run("INSERT INTO users(usr_id, name, email, promotion, arrival_date, room, password) VALUES(?, ?, ?, ?, ?, ?)", [
        user_id, 
        userObject.name, 
        userObject.email, 
        userObject.promotion,
        userObject.arrival_date, 
        userObject.room,
        userObject.password
    ], (err) => {
        if(err) {
            console.error(err);
            return 500;
        }

        db.close();
        return 201;
    });
};