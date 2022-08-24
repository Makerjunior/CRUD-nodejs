const mysql = require('mysql');

class ClassCrud {

    constructor() {
        //Conexão com base de dados
    this.sql = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database:'nodejs'
        })

    }


    read(req, res) {


    }

    create(req, res) {


    }

    delete(req, res) {


    }

    update(req, res, controller = null) {


    }




}
module.export.ClassCrud