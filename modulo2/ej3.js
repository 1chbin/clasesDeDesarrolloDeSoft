//Crear una funcion que reciba un año y que cuente la cantidad de clientes que nacieron en ese año en particular

const fs = require('fs');

function leerClientes(){
    //fs es filesystem y el utf-8 va a hacer que lea bien todas las tildes y cacateres especificos
    const clientesCsv = fs.readFileSync('clientes.csv', 'utf-8');
    const lineasClientes = clientesCsv.split('\r\n');
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

function añosDeNacidos(fecha_nacimiento){
    let añoRepetido = 0;
    for(let i = 0; i < clientes.length; i++){
        let fechaActual = clientes[i].fecha_nacimiento.split("-")
        if(fecha_nacimiento == fechaActual[2]){
            añoRepetido++;
        }
    }
    return añoRepetido;
}

// "dd-mm-aaaa" => [dd, mm, aaaa]

console.log(añosDeNacidos(1997));

