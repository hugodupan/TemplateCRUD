'use strict';

const Generator = require('yeoman-generator');
var yosay = require('yosay');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var mkdirp = require('mkdirp');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = class extends Generator {

    // installingGupRename() {
    //     this.npmInstall(['gulp-rename'], { 'save-dev': true });
    // }

    // installingGupReplace() {
    //     this.npmInstall(['gulp-replace'], { 'save-dev': true });
    // }


    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {}

    prompting() {
        this.log(yosay('Bem-vindo ao gerador de arquivos genéricos de entidades!'))

        var generator = this;
        return this.prompt([{
            type: "input",
            name: "entityName",
            message: "Nome da Entidade",
            default: this.config.get("entityName")
        }, {
            type: "input",
            name: "tableEntityName",
            message: "Nome da tabela de dados da Entidade",
            default: this.tempAnswers
        }]).then((answers) => {
            this.config.set("entityName", answers.entityName);
            this.config.set("tableEntityName", answers.tableEntityName);
            this.config.save();
        });
    }

    configuring() {}

    writing() {
        template: {
            mkdirp(this.templatePath("../temp"));

            this.fs.copy(
                this.templatePath(),
                this.templatePath("../temp"), {
                    process: function(content) {
                        var entityName = new RegExp(/InsertEntityNameHere/, 'g')
                        var tableEntityName = new RegExp(/InsertTableEntityNameHere/, 'g')
                        return content.toString()
                            .replace(entityName, '<%= entityName %>')
                            .replace(tableEntityName, '<%= tableEntityName %>');
                    }
                }
            );

            var entityName = this.config.get("entityName");
            var tableEntityName = this.config.get("tableEntityName");

            this.registerTransformStream(rename(function(path) {
                path.basename = path.basename.replace(/(InsertEntityNameHere)/g, entityName);
                path.dirname = path.dirname.replace(/(InsertEntityNameHere)/g, entityName);

                path.basename = path.basename.replace(/(InsertTableEntityNameHere)/g, tableEntityName);
                path.dirname = path.dirname.replace(/(InsertTableEntityNameHere)/g, tableEntityName);
            }));

            this.fs.copyTpl(
                this.templatePath("../temp"),
                this.destinationPath("app"), {
                    entityName: this.config.get("entityName"),
                    tableEntityName: this.config.get("tableEntityName"),
                }
            );

            this.fs.delete(this.templatePath("../temp"));

            var logger = this;
            fs.rmdir(this.templatePath("../temp"), function(erro) {
                if (erro !== null)
                    logger.log(chalk.red("Ocorreu algum problema ao apagar pasta temporária. Detalhes: " + erro));
            });
        }
    }

    conflicts() {}

    install() {}

    end() {}
};