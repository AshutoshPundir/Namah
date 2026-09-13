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

export const allUsers = async (req, res) => {
    try{

        const userId = req.user.userId;

        const currentUser = await User.findById(userId);

        const excludedUsers = [
            userId,
            ...currentUser.friends
        ];
        
        const users = await User.find({
            _id: {
                $nin: excludedUsers
            }
        }).select("username avatar bio")
    
        if (users.length === 0) {
            return res.status(404).json({
                users: [{}],
                message: "No users found"
            });
        }

        res.status(200).json({
            users,
        })

    }catch(error){
        res.status(500).json({
            message:"Internal Server Error: " + error
        })
    }
}