const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tripRoute = require("./routes/trip");
const cors = require('cors');

app.use(cors({origin: true, credentials: true}));
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err));
    

app.use("/trips", tripRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("The backend is running!!");
})