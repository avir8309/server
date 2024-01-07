const mongoose = require("mongoose");
const User = require("../models/User");
const Post=require("../models/Post");
const jwt = require('jsonwebtoken');


//posts will contain all posts id created by user
exports.getPosts=async(req,res)=>{
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
        return res.status(200).json({
            success:true,
            message:"posts fetched successfully",
            posts:user.posts
        })

        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"internal error while fetching posts"
        })
        
    }
}
exports.createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        const email = req.user.email;

        if (!email) {
            return res.status(401).json({
                success: false,
                message: "User is not logged in or registered yet"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Something wrong with the user"
            });
        }

        const newPost = new Post({
            content,
            imageUrl,
            creator: user._id
        });

        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost,
        });

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "Internal server error while creating the post",
            error:error
        });
    }
};
