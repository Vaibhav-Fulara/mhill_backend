const router = require("express").Router();
const Trip = require("../models/Trip");
// const nodemailer = require("nodemailer");

// //POST CONTACT INFORMATION
// router.post("/contact", (req, res) => {
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'mhill642@gmail.com',
//           pass: 'Ghingran05'
//         }
//       });

//       var mailOptions = {
//         from: 'mhilladventure@gmail.com',
//         to: 'mhilladventure@gmail.com',
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//       };

//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//           res.status(500).json(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.status(200).json("Email sent!");

//         }
//       });
// })

//CREATE A NEW TRIP
router.post("/", (req, res) => {
  // console.log("Here we go saving your new trip over the database");
  const newTrip = new Trip(req.body);
  newTrip
    .save()
    .then((savedTrip) => res.status(200).json(savedTrip))
    .catch((err) => res.status(500).json(err));
});

//UPDATE THE TRIP
router.put("/:id", (req, res) => {
  Trip.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((updatedTrip) => res.status(200).json(updatedTrip))
    .catch((err) => res.status(500).json(err));
});

//DELETE THE TRIP
router.delete("/:id", (req, res) => {
  Trip.findByIdAndDelete(req.params.id)
    .then((DeletedTrip) => res.status(200).json("The trip has been deleted"))
    .catch((err) => res.status(500).json(err));
});

//GET ALL TRIPS
router.get("/all", (req, res) => {
  // console.log("I will fetch you all the trips!!");
  Trip.find()
    .then((AllTrips) => res.status(200).json(AllTrips))
    .catch((err) => res.status(500).json(err));
});

//GET SEASON TRIPS
router.get("/seasons/:cat", (req, res) => {
  // console.log("Here you get according to the season", req.params.season);
  if (req.params.cat === "expeditions") {
    // Trip.find({price: {$gte: 25000}})
    //   .then((seasonTrips) => res.status(200).json(seasonTrips))
    //   .catch((err) => res.status(500).json(err));
    Trip.find()
      .then((seasonTrips) => 
      {
        const expTrips = seasonTrips.filter((trip => {
            if(trip.price>=25000) return trip;
        }))
        res.status(200).json(expTrips);
      })
      .catch((err) => res.status(500).json(err));
  } else {
    const both = "summer-and-winter";
    Trip.find({ $or: [{ seasons: req.params.cat }, { seasons: both }] })
      .then((seasonTrips) => res.status(200).json(seasonTrips))
      .catch((err) => res.status(500).json(err));
  }
});

//GET PRICES
router.get("/prices", (req, res) => {
  Trip.find()
    .select("price")
    .then((priceList) => {
      priceList.forEach((pr) => {
        console.log(pr.price, 25000, pr.price > 25000);
      });
      res.status(200).json(priceList);
    })
    .catch((err) => res.status(500).json(err));
});

//GET A TRIP
router.get("/:id", (req, res) => {
  Trip.findById(req.params.id)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json(err));
});

//GET MOST VISITED TRIPS
router.get("/", (req, res) => {
  Trip.find({mostVis:true})
    .then((MostVisTrips) => res.status(200).json(MostVisTrips))
    .catch((err) => res.status(500).json(err));
});


module.exports = router;
