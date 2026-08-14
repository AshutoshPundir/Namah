import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ConversationList from '../components/ConversationList';

const Home = () => {
 const [selectedConversation, setSelectedConversation] = useState(null)
  return (
    <div>
      <ConversationList 
        setSelectedConversation={setSelectedConversation}
      />
      <ChatWindow
        conversation={selectedConversation}
      />
    </div>
  )
}

export default Home
