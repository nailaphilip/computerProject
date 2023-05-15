'use strict';

const Database = require('./sqlStorage/database');

// const options = {
//     host: 'localhost', //'127.0.0.1'
//     port: 3306,
//     user: 'zeke',
//     password: '1234',
//     database: 'employeedb',
//     allowPublicKeyRetrieval: true //mysql
// };

// const dbA=new Database(options);

// dbA.doQuery('select * from employee')
//     .then(console.log)
//     .catch(console.log);

const optionsB = require('./sqlStorage/databaseConnectionOptions.json');

const dbB = new Database(optionsB);

dbB.doQuery('select * from computer')
    .then(console.log)
    .catch(console.log);

// dbB.doQuery('insert into computer values(?,?,?,?,?,?)',[4,'x','laptop','GT-II',2,null])
//     .then(console.log)
//     .catch(console.log);