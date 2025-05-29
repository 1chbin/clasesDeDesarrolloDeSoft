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

function leerCompras(){
    const comprasJson = fs.readFileSync('compras.json', 'utf-8');
    return JSON.parse(comprasJson);
}

const compras = leerCompras();


//CONTAR LA CANTIDAD DE CLIENTES DE UN DETERMINADO NOMBRE
function contarClientesDeNombre(nombre) {
    const clientesDeNombre = clientes.filter((cliente) => cliente.nombre === nombre);
    return clientesDeNombre.length;
}


//CONTAR LA CANTIDAD DE CLIENTES QUE NACIERON EN UN DETERMINADO AÑO
function contarClientesDelAnio(anio) {
    return clientes
    .filter((cliente) => cliente.fechaNacimiento.split("-")[2] == anio)
    .length;
}

//OBTENER LA CANT. DE GASTO TOTAL DE UN CLIENTE POR ID Y POR DNI
function totalDeGastoSegunId(id) {
    const comprasDelCliente = compras.filter((compra) => compra.id_cliente == id);
    return comprasDelCliente
    .reduce((acumulador, compraActual) => acumulador + compraActual.precio_total, 0);
}

function totalDeGastosSegunDNI(dni) {
    const cliente = clientes.find((cliente) => cliente.documento == dni);

    if(cliente !== undefined) {
        return totalDeGastoSegunId(cliente.id);
    }
    return -1;
}

////Obtener el cliente que mas gasto

function clienteQueMasGasto() {
    return clientes.reduce((mayor, cliente) => {
        const gasto = totalDeGastoSegunId(cliente.id);
        const gastoMayor = totalDeGastoSegunId(mayor.id);
        return gasto > gastoMayor ? cliente : mayor;
    }, clientes[0]);
}


//Si el nombre de algun cliente comienza con la letra "A" y me devuelva un booleano, o sea un true o false
//QUIERO ARMAR UNA FUNCIÓN QUE ME DIGA SI AL MENOS EL NOMBRE DE 1 CLIENTE COMIENZA CON LA LETRA A
function algunClienteComienzaCon(letra) {
    return clientes.some((cliente) => cliente.nombre.startsWith(letra));
}
//QUIERO UNA FUNCIÓN QUE ME DIGA SI TODOS LOS APELLIDOS DE LOS CLIENTES COMIENZAN CON LA LETRA B
function todosLosApellidosComienzanCon(letra) {
    return clientes.every((cliente) => cliente.apellido.startsWith(letra));
}

//Desarrollar una funcion que me diga si al menos un cliente pertenece a la decada del 70

function cliente70(){
    return clientes.some((cliente) => {
        const anioNacimiento = cliente.fecha_nacimiento.split("-")[2];
        return anioNacimiento >= 1970 && anioNacimiento < 1980;
    });
}
console.log(cliente70());

//Desarrollar una funcion que nos diga si todos los clientes de la decada del 80 gastaron mas de 40.000

function todosLosClientes80(){
    return clientes.every((cliente) => {
        const anioNacimiento = cliente.fecha_nacimiento.split("-")[2];
        if(anioNacimiento >= 1980 && anioNacimiento < 1990){
            const gasto = totalDeGastoSegunId(cliente.id);
            return gasto > 40000;
        }
        return true; // Si no es de la decada del 80, lo consideramos como verdadero
    });
}

//Desarrollar una funcion que nos diga si al menos un cliente es menor de edad y si el gasto de los menores de edad es mayor a 50.000

function menorDeEdad(){
    return clientes.some((cliente) => {
        const anioNacimiento = parseInt(cliente.fecha_nacimiento.split("-")[2]);
        if(anioNacimiento >= 2007){
            const gasto = totalDeGastoSegunId(cliente.id);
            return gasto >= 50000;
        }
        else return false; 
    });
}
console.log(menorDeEdad());

