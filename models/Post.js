const mongoose=require("mongoose");
const user=require("../models/User");

const PostModel=new mongoose.Schema({
    content: {
        type: String,
        required: true
      },
      imageUrl: String,
    
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

})
module.exports=mongoose.model("Post",PostModel);
