import mongoose from 'mongoose'
import { User } from './User.js'

const friendSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true       
    },
    status: {
        type: String,
        enum: ["pending","accepted","rejected"],
        default: "pending"
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
{
    timestamps: true
})

export const FriendRequest = mongoose.model("FriendRequest",friendSchema);
