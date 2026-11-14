const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js")
const expressError=require("../utils/expressError.js")
const {listing_schema,reviewSchema}=require("../schema.js")
const Review =require("../models/review.js");
const Listing=require("../models/listing.js")


const validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>err.message).join(",");
        throw new expressError(400,errMsg);

    }else{
        next();
    }
}


//reviews
router.post("/",wrapAsync(async(req,res)=>{
   let listing= await Listing.findById(req.params.id)
   let newReview= new Review(req.body.review)
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();

   console.log("new review saved")
   res.redirect(`/Listings/${listing._id}`)


}))

//delete review
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/Listings/${id}`)

}))

module.exports=router;