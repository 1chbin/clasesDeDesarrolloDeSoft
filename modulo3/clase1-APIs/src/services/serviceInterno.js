import fs from 'fs';

let libros = JSON.parse(fs.readFileSync('c:/Users/windows/Desktop/Carpetas/ClasesDeDesarrollo/clasesDeDesarrolloDeSoft/modulo3/clase1-APIs/libros.json', 'utf8'));

export class serviceInterno {
	constructor() {
		this.filePath = 'c:/Users/windows/Desktop/Carpetas/ClasesDeDesarrollo/clasesDeDesarrolloDeSoft/modulo3/clase1-APIs/libros.json';
	}

	async buscarLibros({ titulo, autor, genero }) {
		try {
			const fs = await import('fs');
			const data = fs.readFileSync(this.filePath, 'utf8');
			if (!data) return [];
			const librosJson = JSON.parse(data);
			if (titulo) {
				return librosJson.filter(libro => libro.titulo && libro.titulo.toLowerCase() === titulo.toLowerCase());
			} else if (autor) {
				return librosJson.filter(libro => libro.autor && libro.autor.toLowerCase() === autor.toLowerCase());
			} else if (genero) {
				return librosJson.filter(libro => libro.genero && libro.genero.toLowerCase() === genero.toLowerCase());
			}
			return [];
		} catch (error) {
			console.log("Ooopss! error interno", error);
			return [];
		}
	}

    crearLibro(data) {
        libros.push(data);
        fs.writeFileSync(this.filePath, JSON.stringify(libros, null, 2), 'utf8');
    }

    modificarLibro(id, data){
        const indice = libros.findIndex((libro) => libro.id == id)

        libros[indice] = ({
            id: id,
            ...libros[indice],
            ...data
        })

        fs.writeFileSync(this.filePath, JSON.stringify(libros, null, 2), 'utf8');
    }

    eliminarLibro(id){
        const indice = libros.findIndex((libro) => libro.id == id)

        libros.splice(indice, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(libros, null, 2), 'utf8');
    }
}

