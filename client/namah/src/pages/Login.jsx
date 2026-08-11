import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth();

  async function handleSubmit(e){
    e.preventDefault();
      try{
        await login(email, password);
        console.log("Login successfull");
      }catch(error){
        console.log("Login failed: " + error)
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

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

          <Button
          type="Login"
          button="Submit"
          />
      </form>
    </div>
  )
}

export default Login
