import { useAuth } from "../context/AuthContext"

const ConversationItem = ({conversation, setSelectedConversation}) => {
    const { user } = useAuth();

    console.log("Current user:", user);

console.log(
    "Participants:",
    conversation.participants
);

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    )

    console.log("Other user:", otherUser);

    
  return (
    <div onClick={ ()=> setSelectedConversation(conversation)}>
      <h2> { otherUser.username } </h2>
      <p> { conversation.lastMessage?.text } </p>
    </div>
  )
}

export default ConversationItem
