const bodyParser = require("body-parser"); 
const mySql = require("mysql");
const express = require("express");
const multer = require("multer");



const connect = require("../connection/connection");
const auth= require("../middleware/auth");


const router = new express.Router();
router.use(bodyParser.json());


//Storage Enigne

const storage = multer.diskStorage({
       destination:function(req,file,cb){
              cb(null,'./uploads/');
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

//Show hospital data

router.get('/hospital/show',auth,(req,res)=>{
       let sql = `select * from hospital`;
       connect.query(sql,(err,results)=>{
              if(err) {
                     res.send(err);
                     console.log(err);}
              console.log(results);
              res.send(results);
       })
     })


//Insert into table

     router.post("/hospital/create",auth,(req,res)=>{

       var hospital = {
              "naam":req.body.naam,
              "address":req.body.address,
              "phone":req.body.phone
       }
       

connect.query(`select * from hospital where naam = ?`,hospital.naam,(err,result)=>{

       if(err){
              console.log(err);
       }else{
              console.log(result)
              
              if(result.length==0){

                     console.log("working")
                     console.log(result)
                     connect.query('insert into hospital set ?',hospital,(err,result)=>{
                            if(err) {
                                   console.log(err)
                                   res.send('failed')
                            }else{
                                   
                                   res.send('successfully created')
                                   console.log(hospital)
                                   }
                     })
              }
              else{
                     console.log("Hospital is already registered")
                     res.send("Hospital is already registered");
                 }
              }
       })
})

//Upload hospital image


router.post("/hospital/image",auth,upload.single('doctorImage'),(req,res)=>{
       console.log(req.file);
       // res.send(req.file.originalname);
       var hos_id = req.body.hos_id;
       var photo = "http://localhost:3003/"+req.file.path;
       console.log(photo);

        connect.query("update hospital photo set photo = '"+photo+"' where hos_id = ?;",hos_id,(err,result)=>{
               if(err){
                      console.log(err)
                      res.send(err)
               }else{
                      console.log("photo uploaded")
                      res.send("photo uploaded")
               }

        })    

})



module.exports = router;

     