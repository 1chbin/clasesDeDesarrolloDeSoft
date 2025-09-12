import axios from 'axios';
import { openLibraryService } from './openLibraryService.js';
import { serviceInterno } from './serviceInterno.js';

export class resumenService {
    async buscarMultimedia(q) {

        const externo = new openLibraryService();
        const librosExternosRes = await externo.buscarLibros(q);
        const librosExternos = (librosExternosRes?.docs || []).map(libro => ({
            titulo: libro.title,
            autor: libro.author_name ? libro.author_name.join(', ') : ''
        }));

        const interno = new serviceInterno();
        const librosInternos = await interno.buscarLibros({ titulo: q });

        const tvMazeRes = await axios.get(`https://api.tvmaze.com/search/shows?q=${q}`);
        const seriesPeliculas = tvMazeRes.data.map(item => ({
            titulo: item.show.name,
            año: item.show.premiered ? item.show.premiered.split('-')[0] : '',
            tipo: item.show.type === 'Scripted' ? 'serie' : 'pelicula'
        }));

        const series = seriesPeliculas.filter(item => item.tipo === 'serie');
        const peliculas = seriesPeliculas.filter(item => item.tipo === 'pelicula');

        const resumen = {
            librosExternos: librosExternos.length,
            librosInternos: librosInternos.length,
            peliculas: peliculas.length,
            series: series.length
        };

        return {
            query: q,
            resumen,
            resultados: {
                libros: [...librosExternos, ...librosInternos].map(libro => ({ titulo: libro.titulo, autor: libro.autor })),
                peliculas: peliculas.map(p => ({ titulo: p.titulo, año: p.año })),
                series: series.map(serie => ({ titulo: serie.titulo, año: serie.año }))
            }
        };
    }
}
