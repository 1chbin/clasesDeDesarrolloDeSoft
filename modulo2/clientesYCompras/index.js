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

function leerCompras(){
    const comprasJson = fs.readFileSync('compras.json', 'utf-8');
    return JSON.parse(comprasJson);
}



const clientes = leerClientes();
console.log(clientes);

const compras = leerCompras();
console.log(compras);



//Crear una funcion que reciba un nombre como parametro y cuente la cantidad de clientes que tengan ese nombre
//Crear una funcion que ordene a los clientes por orden de apellido
//Crear una funcion que reciba un año y que cuente la cantidad de clientes que nacieron en ese año en particular
//Crear una funcion que dado el id de un cliente nos diga cual fue el gasto total
//Crear una funcion que dado el dni de un cliente devuelva su gasto total
//Obtener el cliente que mas gasto