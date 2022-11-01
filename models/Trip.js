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
        type:Number,
        required:true
    },
    duration:{
        type:String
    },
    desc:{
        type:Array
    },
    days:{
        type:Array
    },
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