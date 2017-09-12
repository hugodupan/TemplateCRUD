module.exports = app => {
    const controleUsuario = app.api.sistema.controles.ControleUsuario;
    const config = app.api.sistema.configuracao;

    app.route(config.urlBase + "/Usuario")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            controleUsuario.listar(req, res);
        })
        .post((req, res) => {
            if (req.body) {
                controleUsuario.cadastrar(req, res);
            } else {
                res.sendStatus(412);
            }
        });

    app.route(config.urlBase + "/Usuario/:codigo")
        .all(app.api.sistema.autorizacao.authenticate())
        .get((req, res) => {
            if (req.body && req.params.codigo) {
                controleUsuario.buscarCodigo(req, res);
            } else {
                res.sendStatus(412);
            }
        }).put((req, res) => {
            if (req.body && req.params.codigo) {
                controleUsuario.editar(req, res);
            } else {
                res.sendStatus(412);
            }
        }).delete((req, res) => {
            if (req.body && req.params.codigo) {
                controleUsuario.excluir(req, res);
            } else {
                res.sendStatus(412);
            }
        });
};