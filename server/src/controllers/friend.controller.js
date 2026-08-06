import { request } from "express";
import { FriendRequest } from "../models/FriendRequest.js";
import { User } from "../models/User.js";

export const sendFriendRequest = async (req, res) => {
    try {

        const senderId = req.user.userId;
        const { receiverId } = req.body;

        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself."
            });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                {
                    sender: senderId,
                    receiver: receiverId
                },
                {
                    sender: receiverId,
                    receiver: senderId
                }
            ]
        });

        if (existingRequest) {
            return res.status(409).json({
                message: "Friend request already exists."
            });
        }

        const friendRequest = await FriendRequest.create({
            sender: senderId,
            receiver: receiverId,
            status: "pending"
        });

        return res.status(201).json({
            message: "Friend request sent successfully.",
            friendRequest
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error " + error
        });
    }
};

export const getPendingRequests = async (req, res)=>{
    try{
    const userId = req.user.userId;

    const requests = await FriendRequest.find({
        receiver: userId,
        status: "pending"
    }).populate(
        "sender",
        "username avatar bio"
    )


    res.status(200).json({
        requests
    })
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

}

export const acceptFriendRequest = async (req, res)=>{

    try{
    const { requestId } = req.params;

    const request = await FriendRequest.findById(requestId);

    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }

    if (request.receiver.toString() !== req.user.userId) {
        return res.status(403).json({
            message: "You are not allowed to reject this request."
        });
    }

    if(request.status === "accepted"){
        return res.status(409).json({
            message:"Friend request has already been accepted"
        })
    }

    if(request.status === "rejected"){
        return res.status(409).json({
            message:"Send new friend request "
        })
    }

    request.status = "accepted";

    await request.save();
    // add receiver to sender's friend
    await User.findByIdAndUpdate(
        request.sender,
        {
            $addToSet:{
                friends: request.receiver
            }
        }
    )
    
    // add sender to receiver's friend
    await User.findByIdAndUpdate(
        request.receiver,
        {
            $addToSet:{
                friends: request.sender
            }
        }
    )

    return res.status(200).json({
        message:"Friend request has been accepted successfully"
    })

    }catch(error){
    return res.status(500).json({
        message:"Internal Server Error"
    })
}

}

export const rejectFriendRequest = async (req, res)=>{

    try{
    
    const { requestId } = req.params;

    const request = await FriendRequest.findById(requestId);

    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }

    if (request.receiver.toString() !== req.user.userId) {
        return res.status(403).json({
            message: "You are not allowed to accept this request."
        });
    }

    if(request.status === "accepted"){
        return res.status(409).json({
            message:"Friend request has already been accepted"
        })
    }

    if(request.status === "rejected"){
        return res.status(409).json({
            message:"Friend request has already been rejected"
        })
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json({
        message:"Friend request has been rejected"
    });

    }catch(error){
        return res.status(500).json({
        message:"Internal Server Error"
    })
    }

}

export const cancelFriendRequest = async (req, res)=>{
    try{

        const { requestId } = req.params;
        const request = await FriendRequest.findById(requestId);

        if(!request){
            return res.status(404).json({
                message:"Request not found"
            })
        }

        if (request.sender.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to cancel this request."
            });
        }  

        if (request.status !== "pending") {
            return res.status(409).json({
            message: "Only pending requests can be cancelled."
            });
        }

        await FriendRequest.findByIdAndDelete(requestId)

        return res.status(200).json({
            message:"Request has been canceled"
        })        

    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getAllFriends = async (req, res)=>{
    try{
        const user = await User.findById(req.user.userId).select("-password").populate(
            "friends","username avatar bio"
        )

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        return res.status(200).json({
            friends : user.friends
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}