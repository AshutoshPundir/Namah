import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import { io, onlineUser } from '../config/socket.js'

export const sendMessage = async (req, res)=>{
    try{

        const {receiverId ,text} = req.body;    
        const userId = req.user.userId;

        if(!receiverId || !text){
            return res.status(400).json({
                message:"receiver ID and text are required"
            })
        }
        const sender = await User.findById(userId);
        
        const isFriends = sender.friends.some(
            friends => friends.toString() === receiverId
        )

        if(!isFriends){
            return res.status(403).json({
            message: "You can only send messages to your friends."
        });
        }

        const receiver = await User.findById(receiverId);

        if(!receiver){
            return res.status(404).json({
                message:"Receiver not found"
            })
        }
    
        let conversation = await Conversation.findOne({
            participants:{
                $all:[userId,receiverId]
            }
            
        })
        if(!conversation){     
            conversation = await Conversation.create({
                participants: [userId, receiverId]
            })
        }
    
        const message = await Message.create({
            conversation: conversation._id,
            sender: userId,
            text
        })
    
        conversation.lastMessage = message._id;
        await conversation.save();

        const receiverSocketId = await onlineUser.get(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",message)
        }

        return res.status(201).json({
            message
        })

    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error: " + error
        })
    }

}

export const getMessages = async (req, res)=>{
    try{

        const { conversationId } = req.params;
    
        const conversations = await Conversation.findById(conversationId);
    
        if(!conversations){
            return res.status(404).json({
                message:"Conversation not found"
            })
        }
    
        const isParticipants = await conversations.participants.some(
            participants => participants.toString() === req.user.userId
        );
    
        if (!isParticipants) {
        return res.status(403).json({
            message: "You are not authorized to view this conversation."
        });
        }
    
        const messages = await Message.find({
            conversation: conversationId
        })
        .populate("sender", "username avatar")
        .sort({
            createdAt: 1
        })
        
        return res.status(200).json({
            messages
        })
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}