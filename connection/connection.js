const mySql = require("mysql");
const express = require("express");

var db = mySql.createConnection({
       host:"localhost",
       user:"root",
       password:"mutillidae",
       database:"myDoctor",
       multipleStatements:true

})


//Connecting
db.connect((err)=>{
       if(!err){
              console.log("Successfull");
       }
       else{
              console.log(err);
              console.log("failed");
       }
})

module.exports = db;