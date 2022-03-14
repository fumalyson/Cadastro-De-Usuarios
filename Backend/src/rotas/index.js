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
    .post('/user', pessoaController.insert)



export default rotas