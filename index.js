const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const tripRoute = require("./routes/trip");
const reviewRoute = require("./routes/review");
const cors = require("cors");
const authRoute = require("./routes/auth");
const multer = require("multer");
const path = require("path");

app.use(cors({ origin: true, credentials: true }));
dotenv.config();
app.use(express.json());
app.use("/images/", express.static("./images"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {  
    cb(null, file.originalname.split('.')[0] + '-' + Math.floor(Date.now()/1000) + '.' + file.originalname.split('.')[1]);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jfif")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter});

app.use("/trips", tripRoute);
app.use("/reviews", reviewRoute);
app.use("/auth", authRoute);
app.post("/upload", upload.array("files", 10), (req, res) => {
  res.status(200).json("The file has been uploaded!");
});

const port = process.env.PORT || 50000;

app.listen(port, () => {
  console.log("The backend is running!!");
});
