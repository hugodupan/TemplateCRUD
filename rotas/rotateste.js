module.exports = app => {
    const controleteste = app.api.sistema.controles.Controleteste;
    const config = app.api.sistema.configuracao;

    app.route(config.urlBase + "/teste")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            controleteste.listar(req, res);
        })
        .post((req, res) => {
            if (req.body) {
                controleteste.cadastrar(req, res);
            } else {
                res.sendStatus(412);
            }
        });

    app.route(config.urlBase + "/teste/:codigo")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            if (req.body && req.params.codigo) {
                controleteste.buscarCodigo(req, res);
            } else {
                res.sendStatus(412);
            }
        }).put((req, res) => {
            if (req.body && req.params.codigo) {
                controleteste.editar(req, res);
            } else {
                res.sendStatus(412);
            }
        }).delete((req, res) => {
            if (req.body && req.params.codigo) {
                controleteste.excluir(req, res);
            } else {
                res.sendStatus(412);
            }
        });
};