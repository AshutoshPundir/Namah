import axios from "axios";
import { useEffect,useState } from "react";
import FriendCard from "./FriendCard";

const FriendList = ({
    refreshFriends,
    setSelectedConversation,
    setRefreshConversations,
    setShowFriendsModal
    }) => {
    const [friends, setFriends] = useState([]);
    useEffect(()=> {
        console.log("refreshFriends changed:", refreshFriends);
        async function getFriends() {
            const response = await axios.get("http://localhost:3000/api/friends/allFriends",
                {
                    withCredentials: true
                }
            )
            console.log("friends from API:", response.data.friends);
            setFriends(response.data.friends)
        }
        getFriends();
    },[refreshFriends])

    async function handleSendMessage(e,friend){
        e.preventDefault();
        const response = await axios.post("http://localhost:3000/api/conversations/start",
            {
                receiverId: friend._id
            },
            {
                withCredentials: true
            }
        )

        setSelectedConversation(response.data.conversation)
        setShowFriendsModal(false)
        setRefreshConversations((prev) => !prev);
    }

    return (
    <div >
        {friends.map((friend)=> {
            return <div 
                key={friend._id}
                onClick={(e)=> handleSendMessage(e,friend)}
                className="p-2 m-1 px-4 bg-white rounded-sm border border-white hover:border-gray-300"
                >
                    {/* {friend.username} */}
                    <FriendCard friend={friend}/>
            </div>
        })}
    </div>
  )
}

export default FriendList
