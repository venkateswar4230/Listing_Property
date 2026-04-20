const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing= require('./models/listing');
const port=process.env.PORT || 3000;
require('dotenv').config();
const path=require('path')
const methodOverride = require('method-override');
const { log } = require('console');
const engine = require('ejs-mate');
const wrapAsync= require("./utility/wrapAsync.js");
const Review=require("./models/review.js");
const {newListing,reviewSchema}=require("./schema.js");
const expressError=require("./utility/expressErr.js");

const listing=require('./route/listing.js');
const reviews=require("./route/review.js");

app.engine('ejs', engine);
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}))



app.use(express.static("public"));
main().then((res)=>{console.log('connection successful');})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// app.get("/",(req,res)=>{
//   res.send("home directory");
// })


app.use('/',listing);
app.use('/listing/:id/reviews', reviews)


app.all("*",(req,res,next)=>{
  next(new expressError(401,"page not found"));
})

app.use((err,req,res,next)=>{
  let {status=500, message}=err;
  res.status(status).render("error.ejs",{message});
})

app.listen(port, ()=>{
  console.log(`app is listening on the port ${port}`);
});