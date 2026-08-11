import { useAuth } from '../context/AuthContext'



const Home = () => {
  const {logout} = useAuth()
  
  async function logOut(){
    await logout();
  }
  return (
    <div>
      Home page
      <button onClick={logOut}>logout</button>
    </div>
  )
}

export default Home
