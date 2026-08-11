import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next)=>{
    try{

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"Access denied"
            })
        }

        const decoded = verifyToken(token);

        req.user = decoded;
        
        next();

    }catch(error){
        return res.status(409).json({
            message:"Invalid or expired token"
        })
    }
    
}

export default authMiddleware;