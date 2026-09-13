import { Conversation } from "../models/Conversation.js";

export const getConversations = async (req, res) => {
    try {

        const userId = req.user.userId;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate("participants", "username avatar bio")
        .populate("lastMessage", "text createdAt");

        if (conversations.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json({
            conversations
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error: " + error
        });

    }
}

export const startConversation = async (req, res) => {

    try{
        
        const { receiverId } = req.body;
        
        const userId = req.user.userId;
        
        const conversation = await Conversation.findOne({
            participants: {
                $all: [
                    userId,
                    receiverId
                ]
            }
        }).populate(
            "participants",
            "username avatar bio"
        );
        
        if(conversation){
            return res.status(200).json({
                conversation
            })
        }
        
        const newConversation = await Conversation.create({
            participants: [userId, receiverId]
        })

        const populatedConversation = await Conversation.findById(newConversation._id)
            .populate(
                "participants",
                "username avatar bio"
            );

        res.status(201).json({
            conversation: populatedConversation,
            message:"Conversation created"
        })

    }catch(error){
        return res.status(500).json({
            message:"Internal server Error: " + error
        })
    }
}