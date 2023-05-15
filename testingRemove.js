'use strict';

const Datastorage = require('./sqlStorage/dataStorageLayer');

const storage = new Datastorage();




storage.remove().then(console.log).catch(console.log)

