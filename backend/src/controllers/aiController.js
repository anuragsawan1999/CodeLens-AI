const Groq = require("groq-sdk");
const Analysis = require("../models/Analysis");


const groq = new Groq({

    apiKey: process.env.GROQ_API_KEY

});



exports.analyzeCode = async (req,res)=>{


try{


const {code, language} = req.body;



if(!code){

return res.status(400).json({

success:false,

message:"Code is required"

});

}




console.log("AI ANALYSIS STARTED");





const completion = await groq.chat.completions.create({


model:"openai/gpt-oss-20b",


messages:[

{

role:"system",

content:
"You are a senior software engineer. Analyze code and give useful review."

},


{

role:"user",

content:`

Analyze this ${language || "programming"} code.


Return response in this format:


🐞 Bugs:
-


🚀 Improvements:
-


🔒 Security:
-


⭐ Code Quality Score:
__/100



CODE:

${code}

`

}

],


temperature:0.3


});





const result = 
completion.choices[0].message.content;




// save history

const savedAnalysis = await Analysis.create({

user:req.user.id,

code,

result

});





res.json({

success:true,

analysis:result,

id:savedAnalysis._id

});





}
catch(error){


console.log(
"GROQ ERROR:",
error.message
);



res.status(500).json({

success:false,

message:"AI analysis failed",

error:error.message

});


}


};