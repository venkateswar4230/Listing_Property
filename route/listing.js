const express=require('express');
const router=express.Router();
const Listing= require('../models/listing.js');
const wrapAsync= require("../utility/wrapAsync.js");
const expressError=require("../utility/expressErr.js");
const {newListing}=require("../schema.js");


const validateListing = (req,res,next)=>{
    let { error } = newListing.validate(req.body);
    if (error) {
      let errMsg = error.detail.map((el) => el.message).join(",");
      throw new expressError(400,errMsg);
    }else {
      next();
    }
  };



router.get("/",async (req,res,next)=>{
    const allListing=await Listing.find({});
    res.render("listing/index.ejs",{allListing})
  });
  
  router.get("/new",(req,res)=>{
    res.render("listing/new.ejs");
  })
  
  router.post("/", validateListing, wrapAsync(async (req,res,next)=>{
  
    let {title,description,image,price,country,location}=req.body;
     const newListing=new Listing({  
      title:title,
      image:image,
      description:description, 
      price:price,
      country:country,
      location:location,
     }); 
      await newListing.save();
     res.redirect("listing")
  }))
  
  router.get("/:id", wrapAsync( async(req,res,next)=>{
    let {id}=req.params;
    const data=await Listing.findById(id).populate('reviews');    
    res.render("listing/view.ejs",{data});
  }));
  
  router.get("/:id/edit", wrapAsync( async(req,res,next)=>{
    let {id}=req.params;
    const data=await Listing.findById(id);
    res.render("listing/edit.ejs",{data});
  }));
  
  router.put("/:id",  validateListing, wrapAsync( async(req,res,next)=>{
    let {id}=req.params; 
    await Listing.findByIdAndUpdate(id,{...req.body.listing},{new:true});
    res.redirect("/listing");
  }));
  
  router.delete("/:id", wrapAsync( async (req,res,next)=>{
    let {id}=req.params;
     let deleted=await Listing.findByIdAndDelete(id);
     res.redirect("/listing");
  }));

  module.exports= router;