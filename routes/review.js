const router = require("express").Router();
const Review = require("../models/Review");

//GET THE LIST OF ALL REVIEWS
router.get("/all", (req, res)=> {
    Review.find()
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json(err));
})

//POST A NEW REVIEW
router.post("/", (req, res)=> {
    const newReview = new Review(req.body);
    newReview.save()
    .then((savedReview) => res.status(200).json(savedReview))
    .catch(err => res.status(500).json(err))
})

// DELETE A REVIEW
router.delete("/:id", (req, res) => {
    Review.findByIdAndDelete(req.params.id)
    .then((deletedreview)=> res.status(200).json("The review has been deleted!"))
    .catch(err => res.status(500).json(err));
})

module.exports = router;