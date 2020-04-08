var mongoose = require("mongoose");

hotelSchema = new mongoose.Schema({
    title: String,
    image: String,
    image2: String,
    image3: String,
    image4: String,
    description: String,
    location: String,
    coordinates: String,
    price: String,
    author: {
    	id:{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User"
    	},
    	username: String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      } 
   ]
}); 

module.exports = mongoose.model("hotels", hotelSchema);