export class RepositorioDeUsuarios {
    constructor() {
        this.usuarios = [];
    }

    guardar(usuario) {
        this.usuarios.push(usuario);
    }

    buscarPorEmail(email) {
        return this.usuarios.filter(usuario => usuario.email === email);
    }
}