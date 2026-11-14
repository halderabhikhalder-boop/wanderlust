const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js")
const expressError=require("../utils/expressError.js")
const {listing_schema,reviewSchema}=require("../schema.js")
const Listing=require("../models/listing.js")


const validateListing =(req,res,next)=>{
    let {error}=listing_schema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>err.message).join(",");
        throw new expressError(400,errMsg);

    }else{
        next();
    }
}




//index route
router.get("/",
    wrapAsync(async(req,res)=>{
const allListings =await Listing.find({})
    res.render("listings/index.ejs",{allListings})
}));

//new route

router.get("/new",(req,res)=>{
    // if(!req.isAuthenticated()){
     
    //     res.redirect("/Listings")
    // }
    res.render("listings/new.ejs")
})
//create route
router.post("/"
    ,wrapAsync(async(req,res,next)=>{
       let result= listing_schema.validate(req.body);
       console.log(result)
       
    
          const newListing=  new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/Listings")

    

}));

//show route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
  const listing= await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs",{listing})
}));


//edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
      let {id}=req.params;
  const listing= await Listing.findById(id)
  res.render("listings/edit.ejs",{listing})
}))
//update route
router.put("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
     if(!req.body.listing){
          throw  new expressError(400,"send valid data for listing")
        }
  await  Listing.findByIdAndUpdate(id,{...req.body.listing})
  res.redirect(`/Listings/${id}`)
}))


//delete route

router.delete("/:id/delete",wrapAsync(async(req,res)=>{
     let {id}=req.params;
  await  Listing.findByIdAndDelete(id)
  res.redirect(`/Listings`)
}))


module.exports = router;