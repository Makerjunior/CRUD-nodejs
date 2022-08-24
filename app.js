
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const handlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000

// Trata o envio de dados do formulario
const urlencodeParser = bodyParser.urlencoded({ extended: false }) 

// Chama a pasta Database que fica dentro de  mode_modules
const crud = require('Database')
let cruds = new crud() // instancia um OBJ da classe ClassCrud que está dentro da pasta Database



//Template egine [Trata do layout] 
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
app.get('/select/:id?', function (req, res) {cruds.read(req,res)})



//Rota controller insert [rota que recebe os dados do formulario]
app.post('/controllerForm', urlencodeParser, function (req, res) {
    console.log(req.body.id + "-" + req.body.nome + " - " + req.body.senha) // Imprimindo dados no console node.js
cruds.create(req,res)
})


//Rota para Delete
app.get("/delete/:id",function(req,res){cruds.delete(req,res)})

//Rota formulario  update
app.get('/update/:id',function(req,res){cruds.update(req,res)})

//Rota para Update
app.post('/controllerUpdate',urlencodeParser,function(req,res){cruds.update(req,res,'controller')})


//************************************************************************************************************************8 */
///Start server
app.listen(port, function (req, res) {
    console.log("Lá vamos nos de novo")
});

