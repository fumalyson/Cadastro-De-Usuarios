import mongoose from "mongoose"
import AutoIncremente from "mongoose-sequence"

const modelSchema = new mongoose.Schema({
    pessoa_id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'É necessário informar seu nome!'
    },
    cpf: {
        type: Number,
        default: '',
        trim: true,
        required: 'É necessário informar o CPF!'
    },
    birth: {
        type: String,
        trim: true,
        default: '',
        required: 'É necessário informar sua data de nascimento!'
    }

})
modelSchema.plugin(AutoIncremente(mongoose), {
    inc_field: 'pessoa_id'
})

modelSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
    this.select('-_id -__v')
})

const modelName = 'pessoa'

export default (mongoose.connection && mongoose.connection.models[modelName] ?
    mongoose.connection.models[modelName] :
    mongoose.model(modelName, modelSchema))