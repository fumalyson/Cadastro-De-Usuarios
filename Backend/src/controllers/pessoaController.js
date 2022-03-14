import PessoaModel from "../models/PessoaModel.js"
import MenssagemDTO from "../dto/MenssagemDTO.js"
export default {
    insert: async (req, res) => {
        const pessoa = new PessoaModel(req.body)
        try {
            await pessoa.save()
        } catch (error) {
            res.json(new MenssagemDTO.Erro(error.message))
            return
        }
    },
    get: async (req, res) => {
        try {
            const pessoas = await PessoaModel.find()
            res.json(new MenssagemDTO.Sucesso(pessoas))
        } catch (error) {
            res.json(new MenssagemDTO.Erro(error.message))
            return
        }
    }
}