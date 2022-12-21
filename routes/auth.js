const router = require("express").Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin.js')

//REGISTERING
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newAdmin =  new Admin({
            username:req.body.username,
            password: hashedPass
        });
        const admin = await newAdmin.save();
        res.status(200).json(admin);
    } catch(err){
        res.status(500).json(err);
    }
});

//LOGGING IN
router.post("/login", (req, res) => {
    try{
        Admin.findOne({username: req.body.username})
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
            .then(validated => {
                if(validated) {
                    const{password, ...others} = user._doc;
                    res.status(200).json(others);
                }
                else { res.status(400).json("Incorrect password")}
            })
        })
        .catch(err=> {res.status(400).json("User not found")});
    } catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;