const express=require('express');
const router=express.Router({mergeParams:true});
const Listing= require('../models/listing.js');
const wrapAsync= require("../utility/wrapAsync.js");
const expressError=require("../utility/expressErr.js");
const Review=require("../models/review.js");
const {reviewSchema}=require("../schema.js");

const validateReview = (req,res,next)=>{
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.detail.map((el) => el.message).join(",");
    throw new expressError(400,errMsg);
  }else {
    next();
  }
};
router.post("/", wrapAsync( async (req,res)=>{
    let getPost= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    getPost.reviews.push(newReview);
     await getPost.save();
    await newReview.save();
    res.redirect(`/listing/${req.params.id}`);
  }));

router.delete("/:reviewId", wrapAsync(async (req,res)=>{
    let {id, reviewId} =req.params;
    // console.log(id); 
    await Listing.findByIdAndUpdate(id ,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
  }));
  
  module.exports=router;