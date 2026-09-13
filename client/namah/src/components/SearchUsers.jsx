import axios from "axios";
import { useEffect, useState } from "react";

const SearchUsers = ({search,setSearch}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function getUsers(){
            try{

                const response = await axios.get("http://localhost:3000/api/user",
                    {
                        withCredentials: true
                    } 
                )
                setUsers(response.data.users)
            }catch(error){
                console.log("Error: " + error)
            }
        }
        getUsers();
    },[])

    const filteredUsers = users.filter((user) =>
        user.username
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    async function handleSendRequest(e, user){
        e.preventDefault();

        try{  
            await axios.post("http://localhost:3000/api/friends/request",
                {
                    receiverId: user._id
                },
                {
                    withCredentials: true
                }
            );

            setUsers((prevUser)=> 
                prevUser.filter(
                    (currentUser) => currentUser._id !== user._id
                )
            )

        }catch(error){
            console.log("Error: " + error)
        }
    }

    return (
    <div >
        
        <input 
            type="search" 
            placeholder="🔍 Search users..." 
            value={search} 
            onChange={(e)=> setSearch(e.target.value)}
            className="bg-[#F0F2F5] w-full p-2 rounded-3xl outline-none"
            
            />
        <div>
            {search && filteredUsers.map((user) => (

                <div key={user._id}
                    className="flex justify-between items-center p-2 border border-gray-400 rounded-2xl mt-2"
                >
                    <div>
                    <h3 className="text-gray-700 cursor-pointer hover:text-black">{user?.username}</h3>
                    <p className="text-sm text-gray-400">{user?.bio}</p>
                    </div>

                    <button 
                    className="border border-gray-400 p-2 rounded-2xl bg-[#F0F2F5] hover:bg-gray-400 hover:text-white cursor-pointer"
                    onClick={(e)=> handleSendRequest(e,user)}>Send Request</button>

                </div>

            ))} 
           
        </div>
    </div>
  )
}

export default SearchUsers
