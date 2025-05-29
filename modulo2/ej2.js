//Crear una funcion que ordene a los clientes por orden de apellido


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



clientes.sort(function (a, b){
        return a.apellido.localeCompare(b.apellido);
    })

console.log(clientes);
