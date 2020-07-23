const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const auth= require("../middleware/auth");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const bodyParser = require("body-parser");
const router = new express.Router();


router.use(bodyParser.json());



router.post("/logout",(req,res)=>{

       var token = req.body.token;

       connect.query('update users set token = null where token = ?',token,(err,result)=>{

              if(err){
                     console.log(err);
                     res.send("error")
              }
              else{

                     if(result.affectedRows==0){
                            console.log("Nothing Happened")
                            res.send("Nothing Happened may be wrong ")
                     }else{
                            console.log("you are successfully loged out")
                            res.send("You are successfully log out")
                     }
                            
                     }      
              })
       });

module.exports = router;