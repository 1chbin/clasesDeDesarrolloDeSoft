export class RepositorioDeUsuarios {
    constructor() {
        this.usuarios = ['id', 'email', 'nombre', 'apellido', 'password'];
    }

    guardar(usuario) {
        this.usuarios.push(usuario);
    }

    buscarPorEmail(email) {
        return this.usuarios.filter(usuario => usuario.email === email);
    }

    buscarPorId(id) {
        return this.usuarios.filter(usuario => usuario.id === id);
    }
}