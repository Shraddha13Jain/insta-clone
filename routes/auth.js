require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User= mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const requireLogin=require('../middleware/requireLogin')
const nodemailer=require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.API_KEY
    }
}))

router.post('/signup',(req,res)=>{
    const{name,email,password,pic}=req.body;
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
      .then((savedUser)=>{
          if(savedUser){
            return res.status(422).json({error:"user already exist with that email"})
          }

          bcrypt.hash(password,12).then(hashedpassword=>{
            const user=new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
            user.save().then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shraddhaj829@gmail.com",
                    subject:"signup success",
                    html:"<h1>WELCOME TO INSTAGRAM </h1>"
                })
                res.json({messgae:"succusfully asded"})
            })
            .catch(err=>{
                console.log(err);
            })
          })
          .catch(err=>{
              console.log(err);
          })
          
      })
})

router.post('/signin',(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
       return res.status(422).json({error : "please add email or password"})
    }
    User.findOne({email:email})
      .then(savedUser=>{
          if(!savedUser){
              return res.status(422).json({error:"invalid email or pasword"})
          }
          bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
              if(doMatch){
                  //res.json({message : "successfully signed in "});
                  const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET);
                  const {_id,name,email,followers,following,pic}=savedUser;
                  res.json({token,user:{_id,name,email,followers,following,pic}});
                }
              else {
                return res.status(422).json({error:"invalid email or pasword"})
              }
          })
          .catch(err=>{
              console.log(err);
          })
      })
   .catch(err=>{
       console.log(err);
   })

})

module.exports= router;