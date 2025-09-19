export class Usuario {
    constructor(id, nombre, apellido, email, fechaNacimiento, biografia, provincia, localidad) {
        this.id = id ?? null;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.biografia = biografia;
        this.gustosMusicales = [];
        this.solicitudes = [];
        this.amigos = [];
        this.falsosAmigos = [];
        this.provincia = provincia;
        this.localidad = localidad;
    }

    getEdad() {
        const hoy = new Date();
        const nacimiento = new Date(this.fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }
}