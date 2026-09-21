const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/profile", authMiddleware, async(req,res)=>{

try{


const user = await User.findById(req.user.id)
.select("-password");


res.json({

success:true,
user

});


}
catch(err){

res.status(500).json({

success:false,
error:err.message

});

}


});

const {
register,
login
}=require("../controllers/authController");



router.post("/register",register);

router.post("/login",login);



module.exports = router;