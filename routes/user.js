const express=require("express");
const router=express.Router();

const {login}=require("../controllers/login");
const {registration}=require("../controllers/registration");
const {auth,isUser,isAdmin}=require("../middlewares/auth");


router.post("/login",login);
router.post("/registration",registration);


router.get("/student",auth,isUser,(req,res)=>{
    res.status(401).json({
        success:true,
        message:"protected route for student"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.status(401).json({
        success:true,
        message:"protected route for Admin"
    })
})

//admin can delete any post as well as user if user deleted all of its post will be deleted


module.exports=router;