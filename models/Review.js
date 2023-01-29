const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    author: {type:String, required:true},
    body: {type:String, required:true},
    title: {type:String, required:true},
    image: {type: [String], required:false},
    rating: {type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
