'use strict';

const mariadb=require('mariadb');

module.exports=class Database{

    constructor(options){
        this.options=options;
    }
    //sql is the sql statement and parameters is
    //an array of values to replace the ?-marks
    doQuery(sql, parameters){
        return new Promise(async (resolve,reject)=>{
            let connection;
            try{
                connection = await mariadb.createConnection(this.options);
                let queryResult = await connection.query(sql,parameters);
                if(typeof queryResult ==='undefined'){
                    reject('QueryError');
                }
                else if(typeof queryResult.affectedRows==='undefined'){
                    //select query
                    resolve({ queryResult,resultSet:true});
                }
                else{
                    resolve({
                        queryResult:{
                            rowsChanged: queryResult.affectedRows,
                            insertId: queryResult.insertId,
                            status:queryResult.warningStatus
                        },
                        resultSet:false
                    });
                }
            }
            catch(err){
                reject('SQL-error: '+err);
            }
            finally{
                if(connection) connection.end();
            }
        });
    }
}