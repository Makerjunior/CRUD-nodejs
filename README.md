# Curso de Node.js  CRUD
* ## Pacotes a serem instalados

1. Express: para uso de bibliotecas.
 ``` 
 npm install --save express 
 ```

2. Nodemon: para que o servidor seja atualizado altomaticamente.
 ```
  npm install -g nodemon
 ```

3. Mysql: para conexão com a base de dados.
 ```
 npm install --save mysql
 ```

4. Body-Parcer: para que os dados possam ser usados de forma fácil no HTML. 
```
 npm install --save body-parser
```

5. Express-Handlebars: para uso de tamplates.
```
 npm install --save express-handlebars
```

---------------------------------------------------------------------------------------------------------------------------  
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
&nbsp;
# Antes de iniciar o progeto é necessário criar a base de dados. 
1. Criar a base de dados com o nome nodejs.
2. Acresentar a base de dados uma tabela de nome  __user__ com os campos __id__ = notnull alto increment , __nome__ = tipo varchar e  __senha__ = tipo varchar(30).
 
Para iniciar o progeto basta executar o comando.
 ```
 nodemon app.js
 ```

 Em caso de erro executar o comando para que o terminal permita a execução do nodemon :
 ```
 Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
 ```


 ## CONEXÃO COM  BASE DE DADOS 

 * Na pasta __*node_modules*__ temos a pasta __*Database*__ com o arquivo index.js contendo a classe __ClassCrud__ com todas as configurações para a conxão com  a base de dados. 



 ```
 const mysql=require('mysql');

class ClassCrud{

    constructor()
    {
        this.sql=mysql.createPool({
            user: "root",
            password: "",
            host: "localhost",ss
            database: "nodejs" 
        });
    }

    read(req,res)
    {
        if(!req.params.id){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from user order by id asc",function(err,results,fields){
                    res.render('select',{data:results});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                sql.query("select * from user where id=? order by id asc",[req.params.id],function(err,results,fields){
                    res.render('select',{data:results});
                });
            });
        }
    }

    create(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);
            res.render('controllerForm',{name:req.body.name});
        });
    }

    deletes(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("delete from user where id=?",[req.params.id]);
            res.render('deletar');
        });
    }

    update(req,res,controller=null)
    {
        if(controller==null){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from user where id=?",[req.params.id],function(err,results,fields){
                    res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                connection.query("update user set name=?,age=? where id=?",[req.body.name,req.body.age,req.body.id]);
                res.render('controllerUpdate');
            });
        }
    }
}
module.exports=ClassCrud;
 ```