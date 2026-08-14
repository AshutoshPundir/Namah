import axios from "axios";
import { useEffect, useState } from "react"
import ConversationItem from "./ConversationItem";


const ConversationList = ({setSelectedConversation}) => {
    const [conversations, setConversations] = useState([]);

    useEffect(()=> {
        const getConversation = async ()=> {
            try{
                const response = await axios.get("http://localhost:3000/api/conversations",
                    {
                        withCredentials: true
                    }
                )
                setConversations(response.data.conversations);
            }catch(error){
                console.log("conversation error: " + error)
            }
        }

        getConversation();
    },[])

  return (
    <div>
        {conversations.map((conversation)=> (
            <ConversationItem
                key={conversation._id}
                conversation={conversation}
                setSelectedConversation={setSelectedConversation}
            />
        ))}
    </div>
  )
}

export default ConversationList
