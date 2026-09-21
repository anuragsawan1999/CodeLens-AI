const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

  try {

    let token = req.headers.authorization;

    console.log("RAW TOKEN:", token);


    if(!token){
      return res.status(401).json({
        message:"No token"
      });
    }


    // Agar Bearer hai to remove karega
    if(token.startsWith("Bearer ")){
      token = token.split(" ")[1];
    }


    console.log("FINAL TOKEN:", token);


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    console.log("DECODED USER:", decoded);


    req.user = decoded;


    next();


  } catch(error){

    console.log("JWT ERROR:", error.message);


    return res.status(401).json({
      message:"Invalid token"
    });

  }

};