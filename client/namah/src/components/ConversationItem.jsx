import { useAuth } from "../context/AuthContext"

const ConversationItem = ({conversation, setSelectedConversation}) => {
    const { user } = useAuth();

    const otherUser = conversation.participants.find(
        participant => participant._id !== user._id
    )

  return (
    <div onClick={ ()=> setSelectedConversation(conversation)}
      className="rounded-lg bg-[#d8dbdb] p-2 px-4 m-0.5 border border-gray-200 hover:border-gray-300"
    >
      <h2 className="text-gray-900"> { otherUser.username } </h2>
      <p className="text-sm text-gray-500"> { conversation.lastMessage?.text } </p>
    </div>
  )
}

export default ConversationItem
