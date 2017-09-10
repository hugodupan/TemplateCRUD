module.exports = app => {
    const controleInsertEntityNameHere = app.api.sistema.controles.ControleInsertEntityNameHere;
    const config = app.api.sistema.configuracao;

    app.route(config.urlBase + "/InsertEntityNameHere")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            controleInsertEntityNameHere.listar(req, res);
        })
        .post((req, res) => {
            if (req.body) {
                controleInsertEntityNameHere.cadastrar(req, res);
            } else {
                res.sendStatus(412);
            }
        });

    app.route(config.urlBase + "/InsertEntityNameHere/:codigo")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            if (req.body && req.params.codigo) {
                controleInsertEntityNameHere.buscarCodigo(req, res);
            } else {
                res.sendStatus(412);
            }
        }).put((req, res) => {
            if (req.body && req.params.codigo) {
                controleInsertEntityNameHere.editar(req, res);
            } else {
                res.sendStatus(412);
            }
        }).delete((req, res) => {
            if (req.body && req.params.codigo) {
                controleInsertEntityNameHere.excluir(req, res);
            } else {
                res.sendStatus(412);
            }
        });
};