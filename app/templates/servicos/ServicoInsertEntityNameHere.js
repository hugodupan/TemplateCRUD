module.exports = app => {
    
        const modeloInsertEntityNameHere = app.api.sistema.banco.modelos.InsertEntityNameHere;
    
        const ControleInsertEntityNameHere = {
            listar: (req, res) => {
                modeloInsertEntityNameHere.findAll({
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
                req.body.CodigoUsuarioCriador = req.user.CodigoUsuarioCriador;
                modeloInsertEntityNameHere.create(req.body)
                    .then(resultado => {
                        res.json(resultado.Codigo);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            editar: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloInsertEntityNameHere.update(req.body, { where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            excluir: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloInsertEntityNameHere.destroy({ where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    }).catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            buscarCodigo: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloInsertEntityNameHere.findOne({
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
        return ControleInsertEntityNameHere;
    };