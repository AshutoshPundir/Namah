import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 16,
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    avatar:{
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
})

export const User = mongoose.model("User",UserSchema)

