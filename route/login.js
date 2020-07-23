const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bodyParser = require("body-parser");
const router = new express.Router();

router.use(bodyParser.json());


// Login
router.post('/login',async(req,res)=>{

       const info={

       "login_email":  req.body.email,
       "password" : req.body.password
       }

       connect.query('select * from users WHERE email = ?',[info.login_email],async (error,results)=>{
                            
              if(!results|| !(await bcrypt.compare(req.body.passwords,results[0].passwords))){

                     if(results[0].passwords !== req.body.password){
                            res.send("Email or passwrod is incorrect")
                            console.log("Email or passwrod is incorrect")
                     }else{
                            res.send("Email or password is incorrect")
                            console.log("Email or passwrod is incorrect")
                     }
                    
              }else{

                     res.send("You are successfully loged in");
                     console.log(results[0].token);
                     if(results[0].token==null){

                            const tokken = jwt.sign({id:results[0].id.toString()},'tokenfordoctorapp',{expiresIn: '7d'});
                     connect.query(`UPDATE users SET token ="${tokken}" where email = ?`,results[0].email,(error,results)=>{
                            if(error){
                                   console.log(error)
                                   res.end();
                            }else{
                                   console.log(results)
                                   res.end();
                                   
                            }
                     });

                     }else{
                            console.log("token already generated")
                     }
                     
                     
              }

       });



})





module.exports = router;


