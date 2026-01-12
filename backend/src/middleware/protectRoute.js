import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute=[
    requireAuth(),
    async (req,res,next)=>{
        try {
            const clerkId=req.auth().userId;
            if(!clerkId) return res.status(401).json({message:"Unauthorized - No Clerk ID"})
                //find user in db
            const user=await User.findOne({clerkId})
            if(!user) return res.status(401).json({message:"Unauthorized - No User Found"})
            req.user=user; //attach user to req object
            next();



        } catch (error) {
            console.error("Error in protectRoute middleware:",error);
            res.status(500).json({message:"Server Error in protectRoute Middleware"});
        }
    }
]