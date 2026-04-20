const mongoose=require('mongoose');
const Listing= require('./models/listing');
const listingData=require("./init/data.js");
require("dotenv").config()


main().then((res)=>{console.log('connection successful');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const insert=async ()=>{
   await Listing.deleteMany({});
  await Listing.insertMany(listingData.data)
}
 insert();
