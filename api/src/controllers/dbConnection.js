const sqlite3 = require('sqlite3').verbose();
let db_directory = './src/database/phenix.db'

let dbConnection = new sqlite3.Database(db_directory, (err) => {
    if(err) {
        console.log('db connection error: ' + err);
        return false;
    }
});

module.exports = dbConnection;