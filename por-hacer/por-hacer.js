//file system
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //convertir el array en formato json

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('../04-porhacer/por-hacer/db/data.json', data, (err) => {
        if (err)
            console.log('No se pudo grabar', err)
    });
}


let cargardb = () => {

    try {
        listadoPorHacer = require('../por-hacer/db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
    // console.log(listadoPorHacer);
}

const crearTarea = (descripcion) => {
    cargardb();
    let PorHacer = {
        descripcion: descripcion,
        completado: false
    };

    listadoPorHacer.push(PorHacer);
    //se porne aqui por que listado por hacer tiene un nuevo registro
    guardarDB();

    return PorHacer;
}

const listado = () => {
    cargardb();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargardb();

    //findIndex funciona con una funcion callback
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        //la posicion index donde se encuentre la igualdad se cambia al default que es true
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargardb();
    let nuevolistado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    //si el listado viejo y el listado nuevo son iguales no borro nada
    if (listadoPorHacer.length === nuevolistado.length) {
        return false
    } else {
        listadoPorHacer = nuevolistado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crearTarea,
    listado,
    actualizar,
    borrar
}