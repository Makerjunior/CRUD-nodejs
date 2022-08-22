const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const handlebars=require('express-handlebars');
const app = express();

//Template egine
//app.engine("handlebars" ,handlebars({defaultLayout:'main'}))
 app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
 app.set('view egine',' handlebars')

// Rotas static para arquivos e img etc
app.use('/css',express.static('css'))
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));



//Routes
/*
:id? = parametro opcional

*/
app.get('/:id?',function(req,res){
   // res.send("lavamos nos ")                // retorna uma string
   // res.sendFile(__dirname+"/index1.html")  // retorna a pagina html
   //console.log(req.params.id)               // id passado na url
   res.render('index.handlebars',{id:req.params.id})
})





///Start server
app.listen(8000,function(req,res){
    console.log("Lá vamos nos de novo")
});

