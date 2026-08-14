import { Conversation } from "../models/Conversation.js";

export const getConversations = async (req, res) => {
    try {

        const userId = req.user.userId;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate("participants", "username avatar")
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