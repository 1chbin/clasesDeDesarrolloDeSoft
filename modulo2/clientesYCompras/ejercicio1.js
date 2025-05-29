
//Crear una funcion que reciba un nombre como parametro y cuente la cantidad de clientes que tengan ese nombre

const fs = require('fs');

function leerClientes(){
    //fs es filesystem y el utf-8 va a hacer que lea bien todas las tildes y cacateres especificos
    const clientesCsv = fs.readFileSync('clientes.csv', 'utf-8');
    const lineasClientes = clientesCsv.split('\n');
    const clientes =[];
    for(let i = 0; i < lineasClientes.length; i++){
        const [id,nombre,apellido,documento,sexo,fecha_nacimiento]
        =lineasClientes[i].split(",");
        if (id){
            clientes.push({
                id,
                nombre,
                apellido,
                documento,
                sexo,
                fecha_nacimiento: fecha_nacimiento
            })
        }
    }
    return clientes;
};

const clientes = leerClientes();



function cantidadDeClientesConNombre(nombre){
    let contadorNombre = 0;
    for(let i = 0; i < clientes.length; i++){
        if (nombre == clientes[i].nombre)
            contadorNombre++;
        }
    return contadorNombre;
}

console.log(cantidadDeClientesConNombre('Juan'));
