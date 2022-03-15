import express from 'express'
import pessoaController from '../controllers/pessoaController.js'

const router = express.Router()
const rotas = router
    .get('/', (req, res) => {
        res.json({
            working: true
        })
    })
    .get('/user', pessoaController.get)
    .get('/user/:id', pessoaController.getById)
    .post('/register', pessoaController.insert)
    .put('/user/:id', pessoaController.update)
    .delete('/user/:id', pessoaController.delete)



export default rotas