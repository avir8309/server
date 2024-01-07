const jwt = require('jsonwebtoken');

require("dotenv").config();


exports.auth=(req,res,next)=>{
    try {
        
        //request me token hoga nikalo ise
        const token=req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found"
            })
        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"verification failed"
            })
            
        }
        next();
        




    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"token error"
        })
        
    }

}

exports.isUser=(req,res,next)=>{
    try {
        
        if(req.user.role!=="user"){
            return res.status(401).json({
                success:false,
                message:"role is not User"
            })
            
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"authorization error for User"
        })
        
    }

}


exports.isAdmin=(req,res,next)=>{
    try {
        
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"role is not Admin"
            })
            
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"authorization error for Admin"
        })
        
    }

}