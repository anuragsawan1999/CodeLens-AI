const express=require("express");

const router=express.Router();

const {
analyzeRepo
}=require("../controllers/githubController");


const authMiddleware =
require("../middleware/authMiddleware");


router.post(
"/analyze",
authMiddleware,
analyzeRepo
);



module.exports=router;