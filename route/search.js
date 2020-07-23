const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const auth= require("../middleware/auth");



const bodyParser = require("body-parser");
const router = new express.Router();
router.use(bodyParser.json());



router.post('/search',(req,res)=>{

     var key = req.body.key;

       connect.query("select * from doctor where naam like '"+key+"%'",(err,result)=>{

              if(err){
                     console.log(err);
                     res.send("error")
              }else{
                     if(result.length==0){
                            console.log("sorry")
                            res.send("Not available")
                     }
                     else{
                            console.log(result)
                            res.send(result)
                     }
                     
              }



       })
})



router.post('/search/id',(req,res)=>{

       var id= req.body.id;

       connect.query('select * from doctor where id = ?',id,(err,result)=>{

              if(err){
                     console.log(err);
                     res.send("error")
              }else{
                     if(result.length==0){
                            console.log("sorry")
                            res.send("Not available")
                     }
                     else{
                            console.log(result)
                            res.send(result)
                     }
                     
              }



       })
})




router.post('/search/speciality',(req,res)=>{

       var speciality= req.body.speciality;

       connect.query('select * from doctor where speciality = ?',speciality,(err,result)=>{

              if(err){
                     console.log(err);
                     res.send("error")
              }else{
                     if(result.length==0){
                            console.log("sorry")
                            res.send("Not available")
                     }
                     else{
                            console.log(result)
                            res.send(result)
                     }      
              }
       })
})



router.post('/search/doctor',(req,res)=>{

       var naam= req.body.naam;

       connect.query('select hospital.naam from hospital join doctor on hospital.hos_id =doctor.id where doctor.naam = ?',naam,(err,result)=>{

              if(err){
                     console.log(err);
                     res.send("error")
              }else{
                     if(result.length==0){
                            console.log("sorry")
                            res.send("Not available")
                     }
                     else{
                            console.log(result)
                            res.send(result)
                     }      
              }
       })
})
module.exports = router;