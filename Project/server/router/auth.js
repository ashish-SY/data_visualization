
const express=require('express');
const Sample = require('../model/sample_schema');
const router=express.Router();



router.post('/login',async(req,res)=>{
    try{
        let findResult = await Sample.find({
          });
          res.send(findResult);
    }
    catch(err){
              console.log(err);
       }
});

module.exports=router;
