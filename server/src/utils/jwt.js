import jwt, { decode } from "jsonwebtoken";
const Private_Key = process.env.JWT_PRIVATE_KEY;

export const generateToken = (user)=>{
    const token = jwt.sign(
        {
            userId: user._id,
            email:user.email
        },
        Private_Key,
        {
            expiresIn: "7d"
        }
    );
    return token
}

export const verifyToken = (token)=> {
    const decoded = jwt.verify(token,Private_Key
        // , (err, decode)=> {
        // if(err){
        //     console.log("Token is invalid: ", err.message);
        //     return
        // }}
    );   
    return decoded;
}