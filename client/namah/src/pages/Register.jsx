import { useState } from "react";
import axios from 'axios' 
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("avatar", avatar);

        if(username.trim().length === 0){
            return (
                alert("username can't be empty")
            )
        }
        if(email.trim().length === 0){
            return (
                alert("email can't be empty")
            )
        }
        if(password.trim().length === 0){
            return (
                alert("password can't be empty")
            )
        }
        try{
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                formData
            )

            console.log(response.data)

            navigate("/login");
        
        }catch(error){
            console.log("Error: " + error)
        }
    }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center h-screen w-screen">

        <div className="h-[550px] w-3/4 flex justify-between items-center bg-white rounded-2xl">

            <div className="flex-1 h-[550px]">
                    <img
                        src="../src/assets/bg3.jpg"
                        className="h-full w-full opacity-70 rounded-2xl"
                    />
                    <h1 className="absolute bottom-90 left-60 text-3xl font-bold text-gray-800 ">Create new account</h1>
                    <p className="absolute bottom-85 left-61 text-white ">& connect with with your loved ones.</p>
            </div>
            
            <div className="flex flex-col justify-center items-center flex-1 h-screen py-20">

            <form onSubmit={handleSubmit} className="h-full w-full flex flex-col justify-around items-center" >

            <h1 className="text-3xl font-bold">Signup</h1>

                <Input
                    type="text"
                    value={username}
                    placeholder="Username*"
                    onChange={(e) => setUsername(e.target.value)}
                    
                    />

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="Email*"
                    onChange={(e) => setEmail(e.target.value)}
                    
                    />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Password*"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                <Input
                    label="bio"
                    type="text"
                    value={bio}
                    placeholder="Bio"
                    onChange={(e) => setBio(e.target.value)}
                    /> 
                <div className="p-3 gap-2 border-1 border-gray-300 rounded-xl bg-gray-100 hover:border-blue-300">

                    <label>
                        <p className="block mb-2 text-gray-700 font-medium">Upload Avatar</p>
                        <input 
                        type="file"
                        accept="image/*"
                        onChange={(e)=> setAvatar(e.target.files[0])}
                        className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md 
                        file:border-0 file:cursor-pointer hover:file:bg-blue-600"
                        />
                    </label>
                </div>

                <Button
                button="Register"
                type="submit"
                onClick={handleSubmit}
                ></Button>
                <p>already have an account? <span className="text-gray-800 font-bold hover:text-gray-700 cursor-pointer" onClick={()=> (navigate("/login"))}>Signin</span></p>
                        
            </form>
            </div>
        </div>
    </div>
    // <div className="fixed inset-0 bg-black/40 flex items-center justify-center h-screen w-screen">

    //     <div className="h-3/4 w-4/5 flex justify-between items-center bg-white">

    //         <div className="flex-1">
    //                 <img
    //                     src="../src/assets/bg3.jpg"
    //                     className="h-screen w-full opacity-70"
    //                 />
    //                 <h1 className="absolute bottom-100 left-60 text-3xl font-bold text-gray-800 ">Create new account</h1>
    //                 <p className="absolute bottom-93 left-61 text-white ">& connect with with your loved ones.</p>
    //         </div>
            
    //         <div className="flex flex-col justify-center items-center flex-1 h-screen py-15">

    //         <form onSubmit={handleSubmit} className="h-full w-full flex flex-col justify-around items-center" >

    //         <h1 className="text-3xl font-bold">Signup</h1>

    //             <Input
    //                 type="text"
    //                 value={username}
    //                 placeholder="Username*"
    //                 onChange={(e) => setUsername(e.target.value)}
                    
    //                 />

    //             <Input
    //                 label="Email"
    //                 type="email"
    //                 value={email}
    //                 placeholder="Email*"
    //                 onChange={(e) => setEmail(e.target.value)}
                    
    //                 />

    //             <Input
    //                 label="Password"
    //                 type="password"
    //                 value={password}
    //                 placeholder="Password*"
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 />

    //             <Input
    //                 label="bio"
    //                 type="text"
    //                 value={bio}
    //                 placeholder="Bio"
    //                 onChange={(e) => setBio(e.target.value)}
    //                 /> 
    //             <div className="p-3 gap-2 border-1 border-gray-300 rounded-xl bg-gray-100 hover:border-blue-300">

    //                 <label>
    //                     <p className="block mb-2 text-gray-700 font-medium">Upload Avatar</p>
    //                     <input 
    //                     type="file"
    //                     accept="image/*"
    //                     onChange={(e)=> setAvatar(e.target.files[0])}
    //                     className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md 
    //                     file:border-0 file:cursor-pointer hover:file:bg-blue-600"
    //                     />
    //                 </label>
    //             </div>

    //             <Button
    //             button="Register"
    //             type="submit"
    //             onClick={handleSubmit}
    //             ></Button>
    //             <p>already have an account? <span className="text-gray-800 font-bold hover:text-gray-700 cursor-pointer" onClick={()=> (navigate("/login"))}>Signin</span></p>
                        
    //         </form>
    //         </div>
    //     </div>
    // </div>
  )
}

export default Register;
