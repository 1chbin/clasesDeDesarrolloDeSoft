import express from 'express';
import { route } from './routes/route.js';
import { Service } from './services/service.js';
import { Repositorio } from './repository/repo.js';

const app = express();
const service = new Service();
const repositorio = new Repositorio();

app.use(express.json());

app.use("/api", route);

app.listen(3000, ()=> {
    console.log("Servidor levantado y listo para atender request")
})

export { service, repositorio }