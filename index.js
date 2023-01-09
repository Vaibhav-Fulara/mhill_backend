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

app.use("/trips", tripRoute);
app.use("/reviews", reviewRoute);
app.use("/auth", authRoute)
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("The file has been uploaded!");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("The backend is running!!");
})