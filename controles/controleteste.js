module.exports = app => {
    
        const modeloteste = app.api.sistema.banco.modelos.teste;
    
        const Controleteste = {
            listar: (req, res) => {
                modeloteste.findAll({
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
                modeloteste.create(req.body)
                    .then(resultado => {
                        res.json(resultado.Codigo);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            editar: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloteste.update(req.body, { where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    })
                    .catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            excluir: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloteste.destroy({ where: { Codigo: codigoRecebido } })
                    .then(resultado => {
                        res.sendStatus(200);
                    }).catch(error => {
                        res.status(412).json({ Msg: error.message });
                    });
            },
            buscarCodigo: (req, res) => {
                const codigoRecebido = req.params.codigo;
                modeloteste.findOne({
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
        return Controleteste;
    };