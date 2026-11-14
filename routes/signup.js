const express=require("express");
const router=express.Router();
const User=require("../models/user.js")
const passport=require("passport")


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})


router.post("/signup",async(req,res)=>{
    let{username,email,password}=req.body;
    const newUser=new User({email,username});
  const registerUser= await User.register(newUser,password);
  console.log(registerUser);
  
 
  res.redirect("/Listings");

})

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate('local',{failureredirect : '/login'}),async(req,res)=>{

    res.redirect("/Listings")

})




module.exports=router;