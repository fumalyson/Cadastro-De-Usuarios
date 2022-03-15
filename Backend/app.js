import express from "express"
import cors from 'cors'
import router from "./src/rotas/index.js"
import errorHandler from "./src/handlers/errorHandler.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/', router)
app.use(errorHandler.notFound)

export default app