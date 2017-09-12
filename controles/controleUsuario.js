module.exports = app => {
    
        const modeloUsuario = app.api.sistema.banco.modelos.Usuario;
    
        const ControleUsuario = {
            listar: (req, res) => {
                modeloUsuario.findAll({
                        include: [{
                            all: true
                        }]
                    })
                    .then(resultado => {
                        res.json(resultado);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            cadastrar: (req, res) => {
                req.body.CodigoUsuarioCriador = req.user.Codigo;
                modeloUsuario.create(req.body)
                    .then(resultado => {
                        res.json(resultado.Codigo);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            editar: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloUsuario.update(req.body, { where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            excluir: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloUsuario.destroy({ where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    }).catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            buscarCodigo: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloUsuario.findOne({
                        where: {
                            Codigo: codigoRecebido
                        },
                        include: [{
                            all: true
                        }]
                    })
                    .then(resultado => {
                        res.json(resultado);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            }
    
        };
        return ControleUsuario;
    };