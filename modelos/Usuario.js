module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define("Usuario", {
        Codigo: {
            type: DataType.INTEGER,
            field: "int_codigo",
            primaryKey: true,
            autoIncrement: true
        },
        Nome: {
            type: DataType.STRING,
            field: "txt_nome",
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 80]
            }
        },
        CodigoUsuarioCriador: {
            type: DataType.INTEGER,
            field: "int_ref_usuario_criador",
            allowNull: false,
            validate: {
                isInt: true,
            }
        },
        DataCadastrado: {
            type: DataType.DATE,
            field: "dta_data_cadastro"
        },
        DataEditado: {
            type: DataType.DATE,
            field: "dta_data_edicao"
        },
        DataExcluido: {
            type: DataType.DATE,
            field: "dta_data_exclusao"
        }
    }, {
        tableName: "tbl_usuario",
        timestamps: true,
        createdAt: 'DataCadastrado',
        updatedAt: 'DataEditado',
        paranoid: true,
        underscored: false,
        deletedAt: 'DataExcluido',
    });

    Usuario.associacao = function(modelos) {
        Usuario.belongsTo(modelos.Usuario, { foreignKey: "int_ref_usuario_criador", as: "UsuarioCriador", targetKey: "Codigo" });
    };

    return Usuario;
};