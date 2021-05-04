require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post=mongoose.model("Post");
const User=mongooose.model("User");

router.get('/user/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
            Post.find({postedBy:req.params.id})
            .populate("postedBy","_id name")
            .exec((err,posts)=>{
                 if(err){
                     return res.status(422).json({error:err});
                 }
                 res.json({user,posts})
            })
    }).catch(err=>{
        return res.status(402).json({error:"user not found"});
    })
})


module.exports = router;