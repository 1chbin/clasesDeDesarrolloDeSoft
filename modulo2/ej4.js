//Crear una funcion que dado el id de un cliente nos diga cual fue el gasto total

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
    function totalDeCliente(id_cliente){
        return compras.precio.total;
    }
}

function gastoPorCliente(id){
    const compras = leerCompras();

    for (let index = 0; index < array.length; index++) {
        const compraActual = compras[index];
        
        if (compraActual.id_cliente == id) {
            gastos = gastos + compraActual.precio_total
        }
    }
    return gastos;
}

console.log(gastoPorCliente(2));