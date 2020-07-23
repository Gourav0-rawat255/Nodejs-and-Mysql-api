const mySql = require("mysql");
const express = require("express");
const connect = require("../connection/connection");
const auth= require("../middleware/auth");
const bcrypt = require('bcryptjs');
var uniqid = require('uniqid');
const jwt = require("jsonwebtoken");
const multer = require("multer");

const bodyParser = require("body-parser");
const res = require("express/lib/response");
const router = new express.Router();

router.use(bodyParser.json());


//Storage Enigne

const storage = multer.diskStorage({
       destination:function(req,file,cb){
              cb(null,'./userImage/');
       },
       filename:function(req,file,cb){
              cb(null,new Date().toISOString()+"-"+file.originalname)

       }
});

//File filter for extension

const fileFilter = (req,file,cb)=>{

       if(file.mimetype =='image/jpeg' || file.mimetype =='image/png' ||file.mimetype =='image/jpg'){

              cb(null,true);
       }else{
              cb(null,false);
              console.log("Sorry Only JPEG,PNG,JPG accepted")
              
       }
};


//Init Upload

const upload = multer({storage: storage,
       fileFilter: fileFilter
});


router.get('/users/show',auth,(req,res)=>{
       let sql = `select * from users`;
       connect.query(sql,(err,result)=>{
              if(err) {
                     console.log(err)
              }
              else{
                     console.log(result);
              res.send(result)};
       })
     })




router.post("/users/create",async(req,res)=>{
       const hashed = await bcrypt.hash(req.body.passwords,8);
       // var id = uniqid.req.body.id;

       var id = req.body.id;
      
              var users = {
                     "user_name":req.body.user_name,
                     "passwords":hashed,
                     "contact":req.body.contact,
                     "age":req.body.age,
                     "gender":req.body.gender,
                     "city":req.body.city,
                     "email":req.body.email
              }


 connect.query('insert into users set ?',users,(err,results)=>{
       if(err) {
              console.log(err)
              res.send('Email is already registered')
       }else{

              console.log(users.email)
              res.send("successfully Created")
              connect.query(`select * from users where email = ?`,users.email,(error,results)=>{
                     if(error){
                            console.log(error)
                     }else{
                            console.log(results)
                            const tokken = jwt.sign({id:results[0].id.toString()},'tokenfordoctorapp',{expiresIn: '7d'});
              connect.query(`UPDATE users SET token ="${tokken}" where email = ?`,results[0].email,(error,resul)=>{
                     if(error){
                            console.log(error)
                     }else{
                            console.log("tokken genrated")
                            console.log(token)
                     }
              });
       }
});      
              }
       })
                     });



                     router.post("/users/image",auth,upload.single('usersImage'),(req,res)=>{
                            console.log(req.file);
                            // res.send(req.file.originalname);
                     
                            var photo = "http://localhost:3003/"+req.file.path;
                            console.log(photo);
                     
                             connect.query("update users photo set photo = '"+photo+"' where token = ?;",req.token,(err,result)=>{
                                    if(err){
                                           console.log(err)
                                           res.send(err)
                                    }else{
                                           console.log("photo uploaded")
                                           res.send("photo uploaded")
                                    }
                     
                             })    
                     
                     })                     

// router.get('/token',auth,(req,res)=>{
//        console.log("This is my token.............."+req.token, req.decoded);

//        res.end();
       
// })                     
                                  

module.exports = router;
