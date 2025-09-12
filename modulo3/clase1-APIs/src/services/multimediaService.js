import axios from 'axios';

export class multimediaService {
    async buscarSeries({ titulo }) {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${titulo}`);
        return res.data.map(item => ({
            titulo: item.show.name,
            genero: item.show.genres.join(', '),
            fuente: 'tvmaze'
        }));
    }
}