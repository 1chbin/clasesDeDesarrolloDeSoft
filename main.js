import express from 'express'
import { UsuarioRepo } from './usuarios/usuarioRepo.js'
import { SolicitudAmistad } from './usuarios/solicitudAmistad.js'
import { usuariosRoute } from './route/usuariosRoute.js'
import { amigosRoute } from './route/amigosRoute.js'

const app = express()

app.use(express.json())

// Initialize repositories
const usuarioRepo = new UsuarioRepo();
const solicitudAmistad = new SolicitudAmistad();

// Routes
app.use('/usuarios', usuariosRoute)
app.use('/amigos', amigosRoute)

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'API enComunidad está funcionando' })
})

app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000')
})

export { usuarioRepo, solicitudAmistad };