import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { connectSocket, disconnectSocket } from "../services/socket";
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getCurrentUser = async()=> {
            try{
                const response = await axios.get(
                    "http://localhost:3000/api/auth/me",
                    {
                        withCredentials: true
                    }
                )
                console.log(response.data.user);
                setUser(response.data.user);
            }catch(error){
                setUser(null);
                console.log("Error: " + error);
            }finally{
                setLoading(false)
            }
        }
        getCurrentUser();
    },[])

    useEffect(()=> {
        if(user){
            connectSocket();
        }else{
            disconnectSocket();
        }
    },[user])
    
    const login = async (email, password) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        setUser(response.data);
        
        return response.data;
    } catch (error) {
        console.log("login error: " + error);
        throw error;
    }
    
};

    const logout = async () => {
        try{
            await axios.post("http://localhost:3000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            )

            setUser(null)
        }catch(error){
            console.log("Error: " + error);
        }
    }


    return (
        <AuthContext.Provider value={{user, login, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

