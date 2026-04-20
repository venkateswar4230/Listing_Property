const mongoose=require('mongoose');
const {Schema}= mongoose;
const Review=require("./review.js");
const { defaults } = require('joi');

const newListing= new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    image: {
        filename:String,
        url:String,
        //   default:"",
        //  set:(v)=> v === "" ? "https://images.unsplash.com/photo-1715848349214-9fa6e015cd43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmVsbGF8ZW58MHx8MHx8fDA%3D" : v ,
    },
    price:{
        type:Number,
        require:true,
    },
    location:{
        type:String,

    },
    country:{
        type:String,
        require:true,
    },
    reviews:[
        {type: Schema.Types.ObjectId, ref:'Review'}
    ],
});

newListing.post("findOneAndDelete",async (listing)=>{
    if (listing){
        await Review.deleteMany({_id :{$in: listing.reviews}})
    }
})
const Listing= mongoose.model("Listing",newListing);

module.exports=Listing;