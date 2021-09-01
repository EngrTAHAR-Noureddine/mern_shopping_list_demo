const express= require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
//User Model 
const User = require('../../models/User');
const auth = require('../../middleware/auth');



//@route post api/User
//@desc Auth user
//@access Public

router.post('/',(req,res)=>{
    const {email,password} = req.body;
    //Simple validation
    if(!email||!password){
        return res.status(400).json({
            msg:'Please enter all fields'
        });
    }
    //Check for existing user
    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(400).json({
                msg:'User does not exists'
            });
           //Validate password
           bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({
                        msg:'Invalid credentials'
                    });
                    jwt.sign(
                        {id: user.id},
                        config.get('jwtSecret'), // useless to add
                        (err,token)=>{
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        id:user.id,
                                        name:user.name,
                                        email:user.email         
                                    }
                                });
                            }
                        /* {expiresIn:3600} with seconds */
                    );
                });

        });
});
//@route Get api/auth/user
//@desc Get user data
//@access Private

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
        .select('-password') /* remove password when get user */
        .then(user=>res.json(user));
});

module.exports = router;