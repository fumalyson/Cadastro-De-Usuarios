import PessoaModel from "../models/PessoaModel.js";
import MenssagemDTO from "../dto/MenssagemDTO.js";

function isCpfValid(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0,
            r;
        cpf
            .split(/(?=)/)
            .splice(0, j)
            .forEach(function (e, i) {
                soma += parseInt(e) * (j + 2 - (i + 1));
            });
        r = soma % 11;
        r = r < 2 ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

export default {
    get: async (req, res) => {
        try {
            const user = await PessoaModel.find()
            res.json(new MenssagemDTO.Sucesso(user))
        } catch (error) {
            res.json(new MenssagemDTO.Erro(error.message))
            return
        }
    },
    getById: async (req, res) => {
        try {
            const user = await PessoaModel.findOne({
                pessoa_id: req.params.id
            })
            res.json(new MenssagemDTO.Sucesso(user))
        } catch (error) {
            res.json(new MenssagemDTO.Erro(error.message))
            return
        }
    },
    insert: async (req, res) => {
        const {
            cpf
        } = req.body
        if (!isCpfValid(cpf.toString())) {
            return res.json(new MenssagemDTO.Erro("CPF inválido"))
        }

        const cpfSelect = await PessoaModel.find({
            cpf: cpf
        })

        if (cpfSelect.length) {
            return res.json(new MenssagemDTO.Erro("CPF já cadastrado"))
        }

        const user = new PessoaModel(req.body)

        try {
            await user.save()
            res.json(user)
        } catch (error) {
            return res.json(new MenssagemDTO.Erro(error.message))
        }
    },
    update: async (req, res) => {
        const {
            cpf
        } = req.body
        if (!isCpfValid(cpf.toString())) {
            return res.json(new MenssagemDTO.Erro("CPF inválido"))
        }
        try {
            const user = await PessoaModel.findOneAndUpdate({
                pessoa_id: req.params.id
            }, req.body, {
                new: true
            })
            res.json(new MenssagemDTO.Sucesso(user, 'Usuário atualizado com sucesso!'))
        } catch (error) {
            return res.json(new MenssagemDTO.Erro(error.message))
        }
    },
    delete: async (req, res) => {
        try {
            await PessoaModel.findOneAndDelete({
                pessoa_id: req.params.id
            })
            res.json(new MenssagemDTO.Sucesso([], 'Sucesso ao apagar contato!'))

        } catch (error) {
            return res.json(new MenssagemDTO.Erro(error.message))
        }
    }

};