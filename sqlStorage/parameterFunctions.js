'use strict';

function insertParameters(computer){
    //"insert into computer (id, name, type, processor, amount, imagename)
    return [
        computer.id, computer.name, computer.type, computer.processor,
        computer.amount, computer.imagename
    ];
}

function updateParameters(computer){
    //"update computer set name=?, type=?, processor=?, amount=?, imagename=?",
    //"where id=?"
    return [
        computer.name, computer.type, computer.processor,
        computer.amount, computer.imagename, computer.id
    ];

}

module.exports={insertParameters,updateParameters}