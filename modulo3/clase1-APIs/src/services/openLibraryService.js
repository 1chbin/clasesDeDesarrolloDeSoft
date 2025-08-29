import axios from 'axios';

export class openLibraryService{

    constructor() {
        this.dominio = "https://openlibrary.org";
    }
    async buscarLibros(query){

        try{
            const busqueda = await axios.get(this.dominio + "/search.json", {
                params: {
                    q: query
                }
            })
            return busqueda.data;
        }
        catch(error){
            console.log("Ooopss! error");
            return null;
        }
    }

    async buscarAutor(query){

        try{
            const busqueda = await axios.get('https://openlibrary.org/search.json', {
                params: {
                    author: query
                }
            })
            return busqueda.data;
        }
        catch(error){
            console.log("Ooopss! error");
            return null;
        }
    }

    async buscarGenero(query){

    try{
        const busqueda = await axios.get('https://openlibrary.org/subjects/' + query + '.json', {
        })
        return busqueda.data;
    }
    catch(error){
        console.log("Ooopss! error");
        return null;
    }
}
}