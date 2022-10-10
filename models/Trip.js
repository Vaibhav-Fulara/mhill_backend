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
        type:String,
        required:true
    },
    mostVis:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model("Trip", TripSchema);