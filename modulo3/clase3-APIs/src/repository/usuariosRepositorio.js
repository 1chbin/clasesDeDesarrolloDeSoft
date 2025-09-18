export class RepositorioDeUsuarios {
    constructor() {
        this.usuarios = [];
    }

    obtenerUsuarios() {
        return this.usuarios;
    }

    guardar(usuario) {
        this.usuarios.push(usuario);
    }

    buscarPorEmail(email) {
        return this.usuarios.filter(usuario => usuario.email === email);
    }

    buscarPorId(id) {
        return this.usuarios.filter(usuario => String(usuario.id) === String(id));
    }

    actualizarUsuario(id, datosActualizados) {
        const indice = this.usuarios.findIndex(usuario => String(usuario.id) === String(id));
        let usuario = this.usuarios[indice];
        usuario.nombre = datosActualizados.nombre;
        usuario.apellido = datosActualizados.apellido;
        usuario.email = datosActualizados.email;
        usuario.gustoPreferido = datosActualizados.gustoPreferido;
        this.usuarios[indice] = usuario;
    }

        agregarGustosMusicales(id, gustos) {
            const usuario = this.usuarios.find(usuario => String(usuario.id) === String(id));
            if (usuario) {
                usuario.gustosMusicales = gustos;
                return true;
            }
            return false;
        }

        obtenerGustosMusicales(id) {
            const usuario = this.usuarios.find(usuario => String(usuario.id) === String(id));
            return usuario ? usuario.gustosMusicales : null;
        }

    contarPorGustoMusical(gusto) {
        return this.usuarios.filter(u => u.gustosMusicales.includes(gusto)).length;
    }

    contarPorProvincia(provincia) {
        return this.usuarios.filter(u => u.provincia === provincia).length;
    }

    contarPorLocalidad(localidad) {
        return this.usuarios.filter(u => u.localidad === localidad).length;
    }

    contarMayoresDe(edad) {
        const hoy = new Date();
        return this.usuarios.filter(u => {

            if (!u.fechaNacimiento) return false;
            const nacimiento = new Date(u.fechaNacimiento);
            let edadUsuario = hoy.getFullYear() - nacimiento.getFullYear();
            const m = hoy.getMonth() - nacimiento.getMonth();

            if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
                edadUsuario--;
            }
            
            return edadUsuario >= edad;
        }).length;
    }
}