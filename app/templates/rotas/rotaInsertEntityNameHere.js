module.exports = app => {
    const servicoInsertEntityNameHere = app.api.sistema.servicos.ServicoInsertEntityNameHere;
    const config = app.api.sistema.configuracao;

    app.route(config.urlBase + "/InsertEntityNameHere")
        //DECOMENTE PARA VALIDAÇÃO
        //.all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            servicoInsertEntityNameHere.listar(req, res);
        })
        .post((req, res) => {
            if (req.body) {
                servicoInsertEntityNameHere.cadastrar(req, res);
            } else {
                res.sendStatus(412);
            }
        });

    app.route(config.urlBase + "/InsertEntityNameHere/:codigo")
         //DECOMENTE PARA VALIDAÇÃO
        //.all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            if (req.body && req.params.codigo) {
                servicoInsertEntityNameHere.buscarCodigo(req, res);
            } else {
                res.sendStatus(412);
            }
        }).put((req, res) => {
            if (req.body && req.params.codigo) {
                servicoInsertEntityNameHere.editar(req, res);
            } else {
                res.sendStatus(412);
            }
        }).delete((req, res) => {
            if (req.body && req.params.codigo) {
                servicoInsertEntityNameHere.excluir(req, res);
            } else {
                res.sendStatus(412);
            }
        });
};