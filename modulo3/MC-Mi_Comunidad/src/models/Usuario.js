export class Usuario {
  constructor({ id, nombre, apellido, email, fechaNacimiento, biografia, provincia, localidad }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.fechaNacimiento = fechaNacimiento; // formato esperado YYYY-MM-DD
    this.biografia = biografia || '';
    this.provincia = provincia || '';
    this.localidad = localidad || '';
    this.gustosMusicales = []; // array de strings
  }
}