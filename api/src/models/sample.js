const sqlite3 = require('sqlite3').verbose();

var dbName = 'phenix';
let dbPath = './src/database/';
let dbDirectory = dbPath + dbName + '.db';

let db = new sqlite3.Database(dbDirectory, (err) => {
    if (err && err.code == 'SQLITE_CANTOPEN') {
        console.error('DB connection error: Directory error. Please make sure you use correct directory.');
        return;
    } else if (err) {
        console.log(err);
        return;
    }

    console.log(`Connected to ${dbName} database.`);
});

// function createTables(db) {
//     db.exc(`
//         create table organisations (
//             org_id 
//         )
//     `);
// }