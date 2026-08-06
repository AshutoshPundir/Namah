import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

const Private_Key = process.env.JWT_PRIVATE_KEY;

export const register = async (req, res)=> {
    try{
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

        const user = new User({
            username,
            password: hashedPassword,
            email,
            bio 
        }) 
        await user.save();

        res.status(201).json({
            message:"User created successfully."
        })
    }catch{
        res.status(501).json({
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