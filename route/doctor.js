const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const auth= require("../middleware/auth");

const bodyParser = require("body-parser");
const router = new express.Router();

router.use(bodyParser.json());

//Show hospital data

router.get('/doctor/show',auth,(req,res)=>{
       let sql = `select * from doctor`;
       connect.query(sql,(err,result)=>{
              if(err) console.log(err);
              console.log(result);
              res.send(result);
       })
     })


//Insert into table


     router.post("/doctor/create",auth,(req,res)=>{

       var doctor = {
              "id":req.body.id,
              "naam":req.body.naam,
              "speciality":req.body.speciality,
              "charges":req.body.charges,
              "phone":req.body.phone
       }

       connect.query(`select * from doctor where phone = ?`,doctor.phone,(err,result)=>{

              if(err){
                     console.log(err);
              }else{
                     console.log(result)
                     
                     if(result.length==0){

                            console.log("working")
                            console.log(result)
                            connect.query('insert into doctor set ?',doctor,(err,result)=>{
                                   if(err) {
                                          console.log(err)
                                          res.send('failed')
                                   }else{
                                          
                                          res.send('successfully created')
                                          console.log(doctor)
                                          }
                     
                            })

                     }
                     else{
                            console.log("Phone number already registerd")
                            res.send("Phone number already register");
                     
              }
       }


       })
       
       

})

module.exports = router;


// connect.query('insert into doctor set ?',doctor,(err,result)=>{
//        if(err) {
//               console.log(err)
//               res.send('failed')
//        }else{
//               if(doctor.phone==)
//               res.send('successfully created')
//               }

// })