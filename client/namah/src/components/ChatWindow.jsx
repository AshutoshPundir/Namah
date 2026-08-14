import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import MessageInput from "./MessageInput";
import { getSocket } from "../services/socket";

const ChatWindow = ({conversation}) => {
    const [messages, setMessages] = useState([]) 
    const { user } = useAuth();



    useEffect(()=>{

        if(!conversation){
            return
        }

        const getMessage = async ()=>{
            try{
                
                const response = await axios.get("http://localhost:3000/api/message/" + conversation._id, 
                    {
                        withCredentials: true
                    }
                );
                setMessages(response.data.messages);
            }catch(error){
                console.log("Error fetching messages: " + error)
            }
        }

        getMessage();
    },[conversation])

    useEffect(() => {

    if(!conversation){
        return
    }

    const socket = getSocket();
    
    if(!socket){
        return
    }

    socket.on("newMessage", (newMessage)=> {
        
        if(conversation._id !== newMessage.conversation){
            return
        }

        console.log(newMessage);

        setMessages((prevMessage)=> [
            ...prevMessage,
            newMessage
        ])

    }
);

    return () => {
        socket.off("newMessage");
    };
}, [conversation]);


    if(!conversation){
        return <div>Select a conversation</div>
    }

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    )


    const handleSendMessage = async (text)=> {
        try{
            
            const response = await axios.post("http://localhost:3000/api/message/send",
                {
                    receiverId: otherUser._id,
                    text
                },
                {
                    withCredentials: true
                }
            )
            console.log(response)

            setMessages((prevMessage) => [
                ...prevMessage,
                response.data.message
            ])

        }catch(error){
            console.log("Error sending message: " + error)
        }
        

    }



  return (
    <div>
      {otherUser?.username}
      {messages.map((message)=> ( 
        <div key={message._id}>
            {message.text}
        </div>
      ))}

      <MessageInput onSend={handleSendMessage} />
    </div>
  )
}

export default ChatWindow
