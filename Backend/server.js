import app from "./app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({
    path: '.env'
})

mongoose.connect(process.env.DATABASE)

mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) => {
    console.log(`Erro: ${error.message}`)
})

app.set('port', process.env.APP_PORT)
app.listen(app.get('port'), () => {
    console.log(`Server Running at port ${app.get('port')}`)
})