const simpleGit = require("simple-git");
const fs = require("fs");



exports.analyzeRepo = async (req, res) => {


try {


const { repoUrl } = req.body;



if(!repoUrl){

return res.status(400).json({

success:false,

message:"Github URL required"

});

}




const folder = `./temp-repo-${Date.now()}`;



console.log("CLONING REPO...");



// clone github repo

await simpleGit({

timeout:{

block:120000

}

}).clone(

repoUrl,

folder

);



console.log("CLONE COMPLETE");





let code = "";





function readFiles(dir){


let files;


try{


files = fs.readdirSync(dir);


}

catch(err){

return;

}




files.forEach(file=>{


const path = `${dir}/${file}`;


let stat;


try{


stat = fs.statSync(path);


}

catch(err){

return;

}




if(stat.isDirectory()){



if(

file !== "node_modules" &&

file !== ".git" &&

file !== "dist" &&

file !== "build"

){


readFiles(path);


}



}



else{



if(

file.endsWith(".js") ||

file.endsWith(".jsx") ||

file.endsWith(".ts") ||

file.endsWith(".tsx")

){



try{


code +=


`\n\n// FILE: ${file}\n\n` +

fs.readFileSync(path,"utf8");



}

catch(err){


console.log(
"FILE READ ERROR:",
file
);


}



}



}



});


}





readFiles(folder);





const finalCode =
code.slice(0,15000);




console.log(
"FILES READ:",
finalCode.length
);




console.log(
"SENDING RESPONSE"
);





// send response

res.json({

success:true,

message:"Repo fetched successfully",

characters:finalCode.length,

code:finalCode

});





// cleanup after response

setTimeout(()=>{


try{


fs.rmSync(folder,{

recursive:true,

force:true

});


console.log("TEMP CLEANED");


}

catch(err){


console.log(
"CLEANUP ERROR:",
err.message
);


}


},5000);





}

catch(error){


console.log(

"GITHUB ERROR:",

error.message

);



if(!res.headersSent){


res.status(500).json({

success:false,

message:"Repo analyze failed",

error:error.message

});


}



}



};