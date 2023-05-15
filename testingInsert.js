'use strict';

const Datastorage = require('./sqlStorage/dataStorageLayer');
const { insertParameters } = require('./sqlStorage/parameterFunctions');

const storage = new Datastorage();

const newComp={
    id:123,
    name:'XYZ',
    type:'qwerty',
    processor:'XGT II',
    amount:23,
    imagename:'computer3.png'
};



//storage.insert(newComp).then(console.log).catch(console.log)

(async ()=>{
    try{
        const result = await storage.insert(newComp);
    }
    catch(err){
        console.log(err);
        if(err.code===storage.CODES.NOT_INSERTED){
            console.log('Computer was not inserted')
        }
        else if(err.code===storage.CODES.ALREADY_IN_USE){
            console.log('Computer id was already in use. Choose another id.')
        }
    }

})();