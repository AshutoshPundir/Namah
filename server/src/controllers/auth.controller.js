import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

const Private_Key = process.env.JWT_PRIVATE_KEY;

export const register = async (req, res)=> {
    try{

        let avatar = "";
        const {username, password, email, bio} = req.body;
        const existingUser = await User.findOne({
            $or:[
                {email},
                {username}
            ]
        });
        if(existingUser){
            return res.status(409).json({
                message:'user already exists'
            })
        }

        if(!username || !password || !email){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10);

        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "namah/avatars"
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(buffer);
            });
        };

        if(req.file){
            const result = await uploadToCloudinary(req.file.buffer);
            avatar = result.secure_url;
        }

        const user = new User({
            username,
            password: hashedPassword,
            email,
            bio,
            avatar
        }) 
        await user.save();

        res.status(201).json({
            message:"User created successfully.",
            uploadToCloudinary
            
        })
    }catch(error){
        console.log("Error: " + error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }

}

export const login = async (req, res)=> {

    try{
        const {email ,password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(401).json({
            message:"Invalid Email/Password"
        })
    }

    const comparePass = await bcrypt.compare(password,existingUser.password);

    if(!comparePass){
        return res.status(401).json({
            message:"incorrect password"
        })
    }     

    const token = generateToken(existingUser);

    res.cookie("token",token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:"lax"
    })
    
    console.log(token)

    res.status(200).json({
        token,
        message:"login successfully"
    })


    }catch(e){
        return res.status(500).json({
            message:"Internal server Error"
        })
    }
}

export const getCurrentUser = async (req, res)=> {
    
    try{
        const user = await User.findById(req.user.userId)
        .select("-password")

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        return res.status(200).json({
            user
        })
    }catch(error){
        console.log("Internal Server Error");
    }


}

export const logout = async (req, res)=> {
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Logout successful"
    })
}