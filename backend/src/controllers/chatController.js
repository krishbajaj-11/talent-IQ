import { chatClient } from "../lib/stream";

export async function getStreamToken(req,res) {
    try {
        //use clerkId for Stream not mongodb=>it should match id in stream dashboard
        const token=chatClient.createToken(req.user.clerkId);

        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.image
        });
    } catch (error) {
        res.status(500).json({message:"Server Error in getStreamToken",error:error.message});
        console.error("Error in getStreamToken:",error);
    }
}