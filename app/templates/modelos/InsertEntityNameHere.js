module.exports = (sequelize, DataType) => {
    const InsertEntityNameHere = sequelize.define("InsertEntityNameHere", {
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
        tableName: "InsertTableEntityNameHere",
        timestamps: true,
        createdAt: 'DataCadastrado',
        updatedAt: 'DataEditado',
        paranoid: true,
        underscored: false,
        deletedAt: 'DataExcluido',
    });

    InsertEntityNameHere.associacao = function(modelos) {
        InsertEntityNameHere.belongsTo(modelos.Usuario, { foreignKey: "int_ref_usuario_criador", as: "UsuarioCriador", targetKey: "Codigo" });
    };

    return InsertEntityNameHere;
};