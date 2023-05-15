'use strict';

const Datastorage = require('./sqlStorage/dataStorageLayer');

const storage = new Datastorage();

const newComp={
    id:123,
    name:'XYZ',
    type:'qwerty',
    processor:'XGT II',
    amount:23,
    imagename:'computer3.png'
};



storage.update(newComp).then(console.log).catch(console.log)

