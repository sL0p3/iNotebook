const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'shlokisagoodb$oy';

// Create a User using : POST "/api/auth/createuser" . Doesnt require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 2 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req,res)=>{ 
    // If there are errors , return Bad request and the errors .
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    // Check whether a user with this email exists already .
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error: "A user with this email already exists."})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    // res.send(user)

    const data = {
        user:{
            id:user.id,
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json({authToken});

    } catch (error) {
        console.error(error.message); 
        res.status(500).send("Internal Server Error");
    }
})

// Authenticate a User using : POST "/api/auth/login" . No login required.
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{ 
    // If there are errors , return Bad request and the errors .
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Pleae try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Pleae try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id,
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({authToken});
    }catch(error){
        console.error(error.message); 
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router