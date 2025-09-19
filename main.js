import express from 'express'

const app = express()

app.use(express.json())

app.listen(3000)
app.use


const usuarioRepo = new UsuarioRepo();
const solicitudAmistad = new SolicitudAmistad();

export { usuarioRepo, solicitudAmistad };