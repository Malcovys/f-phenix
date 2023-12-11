const sqlite3 = require('sqlite3').verbose();
const creationTableQuery = require('./shemas').creationTableQuery;

var dbName = 'phenix';
let dbRelativePath = '../';
let dbDirectory = dbRelativePath + dbName + '.db';

let db = new sqlite3.Database(dbDirectory, (err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log(`Connected to ${dbName} database.`);
    }
    
    createTables(db);
});

function createTables(db) {
    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        db.exec('PRAGMA foreign_key = ON');
        
        db.exec(creationTableQuery);

        db.run('COMMIT TRANSACTION');
    });

    db.close();

    console.log('Data base created with success.');
}