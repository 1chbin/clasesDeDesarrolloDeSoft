export class Usuario {
    constructor(id, email, nombre, apellido, fechaNacimiento, biografia, provincia, localidad) {
        this.id = id;
        this.email = email;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.biografia = biografia;
        this.provincia = provincia;
        this.localidad = localidad;
        this.gustosMusicales = [];
    }
}
