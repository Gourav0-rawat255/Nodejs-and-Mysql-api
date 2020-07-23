const jwt = require('jsonwebtoken'); 
const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const bcrypt = require('bcryptjs');


const bodyParser = require("body-parser");
const router = new express.Router();

router.use(bodyParser.json());



const auth = async (req,res,next)=>{

       try{

              const token = req.header('Auth');
              const decoded = jwt.verify(token,"tokenfordoctorapp")

              console.log(decoded.id)

              connect.query("select * from users WHERE id = "+decoded.id+" and token = '"+token+"'",async (error,results)=>{

                     if(error){

                            console.log(error)
                     }else{
                            if(results.length==0){
                                   console.log("token not available");
                                   res.send("Wrong token")
                            }else{
                                   // res.send("authenticating")
                                   console.log("Working");
                                  
                            
                            console.log("token = = "+decoded.id+"|___Token__| == "+token);
                             req.token = token;
                             req.decoded = decoded.id; 
                             next();     
                     }    
                     }
              });
                            
       }catch(e){

              console.log(e)
               res.status(401).send("Please Authenticate");

       }

       
}



module.exports = auth;