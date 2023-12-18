const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {body,validationResult} = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET;

//route to create a user --> no login required.
router.post("/createUser",[
    body("name").trim().isLength({min:3}),
    body("email").trim().isEmail(),
    body("password").exists(),

],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    

    try {

        let user = await  User.findOne({email:req.body.email});

        if(user){
            return res.status(400).json({error:true,message:"Email Already Exists.!"});
        }

        const salt = await  bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            name:req.body.name.trim(),
            password:secPass,
            email:req.body.email.trim(),
        })

        const data = {
            user:{
                id:user.id,
            }
        };

        const token = jwt.sign(data,JWT_SECRET);

       return res.status(200).json({"message":"User Created Successfully.!",result:true,token});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({"message":"Internal Server Error"});        
    }
})

//route to authenticate a user --> no login required.

router.post("/login",[
    body("email").trim().isEmail(),
    body("password").exists(),
],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    try {
        
        let user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({"message":"Invalid Email Id.!"});
        }


        const comparedPasswd = await bcrypt.compare(password,user.password);

        if(!comparedPasswd){
            return res.status(400).json({"message":"Invalid Login Credentials"});
        }

        const data = {
            user:{
                id:user.id,
            }
        }

        const token = jwt.sign(data,JWT_SECRET);
        return res.json({"message":"Logged in Successfully.!",result:true,token});


    } catch (error) {
        
        console.error(error.message);
        return res.status(500).json({"message":"Internal Server Error"});        
    }


})


// Route to get Logged in user data.!

router.get("/getUser",fetchUser,async(req,res)=>{

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).send({data:user,result:true});
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({"message":"Internal Server Error"});        
    }

})

module.exports = router;