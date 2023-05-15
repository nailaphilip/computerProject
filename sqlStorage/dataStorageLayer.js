'use strict';
const path = require('path');

const Database = require('./database');
const config = require('./StorageConfig.json');
const options = require(path.join(__dirname,config.connectionOptions));
const sql = require(path.join(__dirname,config.sqlStatements));

const { CODES, TYPES, MESSAGES } = require(path.join(__dirname, config.statuscodes));

const getAllSql = sql.getAll.join(' ');
const getOneSql = sql.getOne.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');

const PRIMARY_KEY=sql.primaryKey;

const { 
    insertParameters, 
    updateParameters 
} = require(path.join(__dirname, config.parameterFunctions));

module.exports = class Datastorage{

    constructor(){
        this.db=new Database(options);
    }

    get CODES(){
        return CODES;
    }

    get TYPES(){
        return TYPES;
    }

    getAll(){
        return new Promise( async (resolve,reject)=>{
            try{
                const result = await this.db.doQuery(getAllSql);
                resolve(result.queryResult);
            }
            catch(err){
                console.log(err);
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    } //end of getAll

    getOne(id){
        return new Promise(async (resolve,reject)=>{
            try{
                if(!id){
                    reject(MESSAGES.NOT_FOUND('empty', PRIMARY_KEY));
                }
                else{
                    const result = await this.db.doQuery(getOneSql,[id]);
                    if(result.queryResult.length>0){
                        resolve(result.queryResult[0]);
                    }
                    else{
                        reject(MESSAGES.NOT_FOUND(PRIMARY_KEY,id));
                    }
                }
            }
            catch(err){
                console.log(err); //for debugging
                reject(MESSAGES.NOT_FOUND(PRIMARY_KEY,id));
            }
        });
    } //end of getOne

    insert(resource){
        return new Promise(async (resolve,reject)=>{
            try{
                if(resource){
                    if(!resource[PRIMARY_KEY]){
                        reject(MESSAGES.NOT_INSERTED());
                    }
                    else{
                        const result = 
                            await this.db.doQuery(getOneSql,[resource[PRIMARY_KEY]]);
                        if(result.queryResult.length>0){
                            reject(MESSAGES.ALREADY_IN_USE(PRIMARY_KEY, resource[PRIMARY_KEY]));
                        }
                        else{
                            await this.db.doQuery(insertSql,insertParameters(resource));
                            resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
                        }
                    }
                }
            }
            catch(err){
                console.log(err);
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    } //end of insert

    update(resource){
        return new Promise(async (resolve,reject)=>{
            try{
                if(resource){
                    const status = 
                        await this.db.doQuery(updateSql, updateParameters(resource));
                    if(status.queryResult.rowsChanged>0){
                        resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
                    }
                    else{
                        reject(MESSAGES.NOT_UPDATED());
                    }

                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            catch(err){
                console.log(err); // for debugging
                reject(MESSAGES.NOT_UPDATED());
            }
        });
    } //end of update

    remove(id){
        return new Promise(async (resolve,reject)=>{
            try{
                if(!id){
                    reject(MESSAGES.NOT_REMOVED('empty', PRIMARY_KEY));
                }
                else{
                    const status = await this.db.doQuery(removeSql,[id]);
                    if(status.queryResult.rowsChanged>0){
                        resolve(MESSAGES.REMOVE_OK(PRIMARY_KEY,id));
                    }
                    else{
                        reject(MESSAGES.NOT_REMOVED(PRIMARY_KEY,id));
                    }
                }
            }
            catch(err){
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    } //end of remove

} //end of class