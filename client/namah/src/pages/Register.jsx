import { useState } from "react";
import axios from 'axios' 
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("avatar", avatar);

        try{
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                formData
            )

            console.log(response.data)
        }catch(error){
            console.log("Error: " + error)
        }
    }

  return (
    <div>

      <h1>Register</h1>
      <form onSubmit={handleSubmit} >

        <Input
            label="Username"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
        />

        <Input
            label="Email"
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
        />

        <Input
            label="Password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
        />

        <Input
            label="bio"
            type="text"
            value={bio}
            placeholder=" Enter bio"
            onChange={(e) => setBio(e.target.value)}
        /> 

        <label>
            <p>Avatar:</p>
            <input 
            type="file"
            accept="image/*"
            onChange={(e)=> setAvatar(e.target.files[0])}
            />
        </label>

        <Button
        button="Register"
        type="submit"
        onClick={handleSubmit}
        ></Button>
                 
      </form>
    </div>
  )
}

export default Register;
