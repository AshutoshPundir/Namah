import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1]
        if(!authHeader){
            return res.status(401).json({
                message:"access denied"
            })
        }
        console.log("decode start")
        const decoded = verifyToken(token);
        console.log("decode complete")
        req.user = decoded;
        next();

    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error auth"
        })
    }
    
}

export default authMiddleware;