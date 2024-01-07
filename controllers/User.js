const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require('jsonwebtoken');


exports.getDetails=async(req,res)=>{
    try {
        //req.user.email will conatin email of the logged in user
        const email=req.user.email;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"user is not logged in or registered yet"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"something wrong with the user"
            })

        }
        user.password=undefined;
        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            user:user
        })

        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"internal error while fetching user details"
        })
        
    }
}
exports.updateUser=async(req,res)=>{
    try {
        const {name,profilePicture,bio}=req.body;
        const email=req.user.email;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"user is not logged in or registered yet"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"something wrong with the user"
            })

        }
        if(name){
            user.name=name;
        }
        if(profilePicture){
            user.profilePicture=profilePicture;
        }
        if(bio){
            user.bio=bio;
        }
        await user.save();
        return res.status(200).json({
            success:true,
            message:"user updated successfully",
            user:user

        })
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"internal error while updating user"
        })
        
    }
}