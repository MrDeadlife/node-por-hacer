//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
const porHacer = require('../04-porhacer/por-hacer/por-hacer');
//console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crearTarea(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.listado();

        for (let tarea of listado) {
            console.log('=======Por hacer========');
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('========================')
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log(`Comando no reconocido ${comando}`)
}