import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import MessageInput from "../components/MessageInput";
import { getSocket } from "../services/socket";

const ChatWindow = ({conversation}) => {
    const [messages, setMessages] = useState([]) 
    const { user } = useAuth();

// get message
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

// socket connection for real time communication
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
        return <div className="w-full h-screen flex justify-center items-center text-lg text-gray-600">Select a conversation</div>
    }

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    )

    
    const handleSendMessage = async (text)=> {
    console.log("Receiver ID:", otherUser?._id);
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

            setMessages((prevMessage) => [
                ...prevMessage,
                response.data.message
            ])

        }catch(error){
            console.log("Error sending message: " + error)
        }
        
    }

  return (
    <div className="w-full flex flex-col h-screen justify-between bg-[#d8dbdb]">
      {/* // friend name */}
      <div className="px-4 py-4 bg-[#e5eade] shadow-sm flex items-center gap-2">
        <img
            src={otherUser?.avatar || "../src/assets/wanderercreative-blank-profile-picture-973460.svg"}
            alt={otherUser?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        <div className="group cursor-pointer">
            <h1 className=" text-gray-700 text-lg group-hover:hidden">{otherUser?.username}</h1>
            <p className="text-sm text-gray-400 hidden group-hover:block">{otherUser?.bio}</p>
        </div>
      </div>

      {/* // message */}
      <div className="overflow-y-auto flex-1">

      {messages.map((message)=> {

        const senderId = 
            typeof message.sender === "object"
            ? message.sender._id : message.sender
        
        return(
        <div 
            key={message._id} 
            style={{
                display: "flex",
                alignItems:"flex-start",
                justifyContent: 
                    senderId === user._id
                        ? "flex-end" : "flex-start",
                padding:"8px",
                }}
        >
            <div className={`bg-[#e5eade] text-gray-600 p-2.5 text-sm ${senderId === user._id ? 'rounded-tl-2xl' : 'rounded-tr-2xl'}`}>
                {message.text}
            </div>
        </div>
        )
      })}
      </div>

      {/* // input box */}
      <MessageInput onSend={handleSendMessage}/>

    </div>
  )
}

export default ChatWindow
