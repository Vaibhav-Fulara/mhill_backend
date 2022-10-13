const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    destination:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:false
    },
    duration:{
        type:String
    },
    months:{
        type:String,
        required:false
    },
    desc:{
        type:Array
    },
    day1:{
        type:String,
        required:false
    },
    day2:{
        type:String,
        required:false
    },
    day3:{
        type:String,
        required:false
    },
    day4:{
        type:String,
        required:false
    },
    day5:{
        type:String,
        required:false
    },
    mostVis:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model("Trip", TripSchema);