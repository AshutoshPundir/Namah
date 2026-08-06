import { User } from "../models/User.js";

export const getProfile = async (req, res)=>{
    try {
    const userId = req.user.userId;

    const userDetail = await User.findById(userId).select("-password");
    
    if(!userDetail){
        return res.status(404).json({
            message:"user not found"
        })
    }

    res.status(200).json({
        user: userDetail
    })

    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}