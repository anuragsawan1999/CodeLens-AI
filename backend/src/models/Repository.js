const mongoose = require("mongoose");


const repositorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    files:[
        {
            filename:String,
            code:String
        }
    ]

},
{
    timestamps:true
});


module.exports = mongoose.model(
"Repository",
repositorySchema
);