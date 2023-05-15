'use strict';
const path=require('path');
const { sqlStatements, connectionOptions } = require('./config.json');

const Database = require('./sqlStorage/database');
const optionsB = require(path.join(__dirname, 'sqlStorage', connectionOptions));

const sql = require(path.join(__dirname, 'sqlStorage', sqlStatements));

const getAllSql = sql.getAll.join(' ');
const getOneSql = sql.getOne.join(' ');
const insertSql = sql.insert.join(' ');

const dbB = new Database(optionsB);

dbB.doQuery(getAllSql)
    .then(console.log)
    .catch(console.log);

dbB.doQuery(getOneSql,[1])
    .then(console.log)
    .catch(console.log);

// dbB.doQuery(insertSql,[4,'x','laptop','GT-II',2,null])
//     .then(console.log)
//     .catch(console.log);