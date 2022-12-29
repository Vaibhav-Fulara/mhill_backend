const express = require("express")
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tripRoute = require("./routes/trip");
const reviewRoute = require("./routes/review");
const cors = require('cors');
const authRoute = require("./routes/auth");
const multer = require("multer");
const path = require("path");
// const uuidv4 = require("uuid/v4");
// const DIR = "./images/";

app.use(cors({origin: true, credentials: true}));
dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err)=>console.log(err));
    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
        res.status(200).json("The file has been uploaded!");
    })

app.use("/trips", tripRoute);
app.use("/reviews", reviewRoute);
app.use("/auth", authRoute)
const port = process.env.PORT || 50000;

app.listen(port, () => {
    console.log("The backend is running!!");
})