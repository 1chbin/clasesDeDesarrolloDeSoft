export class RepositorioDeUsuarios {
    constructor() {
        this.usuarios = [];
        this.lastId = 0;
    }

    nextId() {
        return ++this.lastId;
    }

    obtenerUsuarios() {
        return this.usuarios;
    }

    guardar(usuario) {
        this.usuarios.push(usuario);
        return usuario;
    }

    buscarPorEmail(email) {
        if (!email) return null;
        return this.usuarios.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }

    buscarPorId(id) {
        return this.usuarios.find(u => u.id === Number(id)) || null;
    }

    actualizar(id, data) {
        const user = this.buscarPorId(id);
        if (!user) return null;
        Object.assign(user, data);
        return user;
    }

    agregarGusto(id, gusto) {
        const user = this.buscarPorId(id);
        if (!user) return null;
        if (!user.gustosMusicales.includes(gusto)) user.gustosMusicales.push(gusto);
        return user.gustosMusicales;
    }

    gustos(id) {
        const user = this.buscarPorId(id);
        if (!user) return null;
        return user.gustosMusicales;
    }
}