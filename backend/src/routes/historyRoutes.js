const express = require("express");
const router = express.Router();

const Analysis = require("../models/Analysis");

const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, async(req,res)=>{

 try{

 const data = await Analysis.find({
   user:req.user.id
 })
 .sort({
   createdAt:-1
 });


 res.json(data);


 }catch(err){

 res.status(500).json({
  message:err.message
 });

 }

});


module.exports = router;