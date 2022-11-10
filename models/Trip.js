const mongoose = require("mongoose");

const Itinerary = new mongoose.Schema({
    head: String,
    detail: [String],
    points: [String]
});

const TripSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    photos: [String],
    price:{
        type:Number,
        required:true
    },
    duration:String,
    desc:[String],
    itinerary: [Itinerary],
    seasons:{
        type:String,
        required:true
    },
    mostVis:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model("Trip", TripSchema);