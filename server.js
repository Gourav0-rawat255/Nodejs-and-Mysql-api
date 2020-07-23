const mySql = require("mysql");
const express = require("express");

const routes = require("./route/api");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

//Show table
app.get("/show",(req,res)=>{
       var sql = "select * from doctor"
       db.query(sql,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send(result[0]);
       })
     })
 //Show one 
 app.get('/show/:age',(req,res)=>{
       let sql = `select * from doctor WHERE age= ${req.params.age}`;
       db.query(sql,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send("fetched post");
       })
     })
     
     
//Login
 app.post('/login',(req,res)=>{
        let name=  req.body.name;
        let age = req.body.age;

       let sql = "select * from doctor WHERE name ='"+name+"'and age='"+age+"'";
       db.query(sql,(err,result)=>{
              if(err){ res.json({
              
                     message:'You got an error wrong credential'
                     
              })
              return;
       }
              else{
                     if(result.length >0){
                            if(name==result[0].name){
                                   res.json({
                                          message:'you are successfully loged in'
                                   })
                            }

                     }
              }
            
       })
     })   ;





// Create table
     app.get("/create",(req,res)=>{
       var sql = "create table doctor(name varchar(15),age int)"
       db.query(sql,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send("TAble created");
       })
     })


    
// //Insert Data
     app.get("/add",(req,res)=>{

       var add = {name:'rawat',age:20};
       var sql = "insert into doctor set ?";
       db.query(sql, add,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send("Person added");
       })
     })
    

// //Insert Data
app.get("/add",(req,res)=>{

       var add = {name:'rawat',age:20};
       var sql = "insert into doctor set ?";
       db.query(sql, add,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send("Person added");
       })
     })     
// //Create connection
var db = mySql.createConnection({
       host:"localhost",
       user:"root",
       password:"mutillidae",
       database:"myDoctor",
       multipleStatements:true

})

// //Connecting
db.connect((err)=>{
       if(!err){
              console.log("Successfull");
       }
       else{
              console.log("failed");
       }
})

app.listen(3003)

module.exports = server;