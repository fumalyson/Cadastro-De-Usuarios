export default {
    Erro: function (mensagem = '', codigoErro = 1) {
        this.codigoErro = codigoErro;
        this.mensagem = mensagem;
    },
    Sucesso: function (resultados, mensagem = '') {
        this.resultados = resultados
        if (mensagem) {
            this.mensagem = mensagem
        }
    }
}