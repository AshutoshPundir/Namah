import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

      if(email.trim().length === 0){
        return alert("email can't be empty")
      }

      if(password.trim().length === 0){
        return alert("password can't be empty")
      }
      try{
        await login(email, password);
        navigate("/app");

      }catch(error){
        console.log("Login failed: " + error)
      }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <img
        src="../src/assets/pexels-pixabay-207247.jpg"
        className="fixed inset-0 opacity-90"
      />

      <div className="h-fit w-lg flex flex-col items-center justify-around rounded ">

      <form onSubmit={handleSubmit} className="z-1 h-110 p-8 flex flex-col justify-around items-center shadow-2xl">

          <h1 className="text-3xl font-bold">Signin</h1>
          <Input 
          label="Username"
          type="text"
          value={email}
          placeholder="Enter Username"
          onChange={(e)=> setEmail(e.target.value)}        
          />

          <Input 
          label="Password"
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e)=> setPassword(e.target.value)}        
          />

          <div className="flex flex-col items-center gap-2">
          <Button
          type="submit"
          button="Submit"
          />
          <p>don't have an account? <span  className="text-gray-800 font-bold hover:text-gray-700 cursor-pointer" onClick={()=> (navigate("/register"))}>Signup</span></p>
          </div>
      </form>
          </div>
    </div>
  )
}

export default Login
