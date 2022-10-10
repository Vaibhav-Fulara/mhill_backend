const router = require("express").Router();
const Trip = require("../models/Trip");

//CREATE A NEW TRIP
router.post("/", (req, res) => {
    console.log("Here we go saving your new trip over the database");
    const newTrip = new Trip(req.body);
    newTrip.save()
    .then(savedTrip => res.status(200).json(savedTrip))
    .catch(err => res.status(500).json(err));
})

//UPDATE THE TRIP
router.put("/:id", (req, res) => {
    Trip.findByIdAndUpdate(req.params.id, {
        $set:req.body
    }, {new:true})
    .then(updatedTrip => res.status(200).json(updatedTrip))
    .catch(err => res.status(500).json(err));
})

//DELETE THE TRIP
router.delete("/:id", (req, res) => {
    Trip.findByIdAndDelete(req.params.id)
    .then(DeletedTrip => res.status(200).json("The trip has been deleted"))
    .catch(err => res.status(500).json(err));
})

//GET ALL TRIPS
router.get("/all", (req, res) => {
    console.log("I will fetch you all the trips!!");
    Trip.find()
    .then(AllTrips => res.status(200).json(AllTrips))
    .catch(err => res.status(500).json(err));
})

//GET A TRIP
router.get("/:id", (req, res)=>{
    Trip.findById(req.params.id)
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(500).json(err));
})

//GET MOST VISITED TRIPS
router.get("/", (req, res) => {
    Trip.find({mostVis:true})
    .then(MostVisTrips => res.status(200).json(MostVisTrips))
    .catch(err => res.status(500).json(err));
})

module.exports = router;