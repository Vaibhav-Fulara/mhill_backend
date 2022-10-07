const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tripRoute = require("./routes/trip");

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err));
    
app.use("/", (req, res)=>{
    console.log("Hey this is the main URL!!");
})

app.use("/trips", tripRoute);

app.listen("5000", () => {
    console.log("The backend is running!!");
})