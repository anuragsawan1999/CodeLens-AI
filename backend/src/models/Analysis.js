const mongoose = require("mongoose");


const analysisSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },


  code:{
    type:String,
    required:true
  },


  result:{
    type:String,
    required:true
  },


},{
  timestamps:true
});


module.exports = mongoose.model(
  "Analysis",
  analysisSchema
);