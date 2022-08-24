//Pacotes a instalar 
// Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const port =process.env.PORT || 3000

// Trata o envio de dados do formulario
const urlencodeParser = bodyParser.urlencoded({ extended: false }) 


//Conexão com base de dados
const sql = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database:'nodejs'
})



//Template egine [Trata do layout]
//app.engine("handlebars" ,handlebars({defaultLayout:'main'}))
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view egine', ' handlebars')


// Rotas static para arquivos CSS , Javascript, img etc
app.use('/css', express.static('css'))
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));



//Routes
/*
/:id? = parametro opcional

*/
//Rota Para index  
app.get('/', function (req, res) {
    // res.send("lavamos nos ")                // retorna uma string
    // res.sendFile(__dirname+"/index1.html")  // retorna a pagina html
    //console.log(req.params.id)               // id passado na url
    res.render('index.handlebars', { id: req.params.id })
})



//Rota para formulario de insert
app.get('/insert', function (req, res) { res.render('insert.handlebars') })




//Rota para select
app.get('/select/:id?', function (req, res) {
    // Se não for passado um id
    if (!req.params.id) {   
        sql.getConnection(function(err,connection){
                // função que retorna os valores da querry      
        connection.query("SELECT * FROM user order by id asc", function (err, results, fields) { // err = erros , results =  resultados, fields = campos da pesquisa
            res.render('select.handlebars', { data: results })
        } // Passa para a view o obj data com os valores da pesquisa 
        )

        })
      } else {
        
        sql.getConnection(function(err,connection){
     
        //Se for passado um id a pesquisa sera feita de acordo com o id passado
        connection.query("SELECT * FROM user WHERE id=? order by id asc", [req.params.id], function (err, results, fields) { // err = erros , results =  resultados, fields = campos da pesquisa
            res.render('select.handlebars', { data: results })
        } // Passa para a view o obj data com os valores da pesquisa 
        )


        })

    }

})



//Rota controller insert [rota que recebe os dados do formulario]
app.post('/controllerForm', urlencodeParser, function (req, res) {
    console.log(req.body.id + "-" + req.body.nome + " - " + req.body.senha) // Imprimindo dados no console node.js
     sql.getConnection(function(err,connection){
    // Query que insere os dados / req.body.campo_do_formulario
    connection.query("insert into user values (?,?,?)", [req.body.id, req.body.nome, req.body.senha])
    // Redireciona para a pagina controler.handlebars e envia o valor do campo nome 
    res.render('controllerForm.handlebars', { nome: req.body.nome })
     })



})


//Rota para Delete
app.get("/delete/:id",function(req,res){
   sql.getConnection(function(err,connection){
    connection.query("DELETE FROM user WHERE id=?",[req.params.id])
    res.render("delete.handlebars")
   })

})



///Start server
app.listen(port, function (req, res) {
    console.log("Lá vamos nos de novo")
});

