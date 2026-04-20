const mongoose = require('mongoose');
const {Schema} =mongoose;

const reviewSchema=new mongoose.Schema({
    Comment:String,
    rating:Number,
    created_at:{ type: Date, default:new Date()},
});
module.exports=mongoose.model("Review",reviewSchema);