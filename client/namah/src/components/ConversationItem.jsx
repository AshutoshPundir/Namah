import { useAuth } from "../context/AuthContext"

const ConversationItem = ({conversation, setSelectedConversation}) => {
    const { user } = useAuth();

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    )
  return (
    <div onClick={ ()=> setSelectedConversation(conversation)}>
      <h2> { otherUser.username } </h2>
      <p> { conversation.lastMessage?.text } </p>
    </div>
  )
}

export default ConversationItem
