import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import Sidebar from '../components/Sidebar';
import FriendsModal from '../components/FriendsModal';
import ProfileModal from '../components/ProfileModal';
import { useAuth } from '../context/AuthContext';

const Home = () => {
 const [selectedConversation, setSelectedConversation] = useState(null)
 const [refreshFriends, setRefreshFriends] = useState(false);
 const [showFriendsModal, setShowFriendsModal] = useState(false);
 const [showProfileModal, setShowProfileModal] = useState(false);
 const { user } = useAuth();

 return (
    <div className='flex h-screen bg-[#e5eade]'>

      <Sidebar
        setSelectedConversation={setSelectedConversation}
        setShowFriendsModal={setShowFriendsModal}
        setShowProfileModal={setShowProfileModal}
      />

      <ChatWindow
          conversation={selectedConversation}
          
      />

      {showFriendsModal && (
        <FriendsModal
          setShowFriendsModal={setShowFriendsModal}
          refreshFriends={refreshFriends}
          setRefreshFriends={setRefreshFriends}
          setSelectedConversation={setSelectedConversation}
        />
      )}

      {showProfileModal && (
          <ProfileModal
              user={user}
              onClose={() => setShowProfileModal(false)}
          />
      )}

    </div>
  )
}

export default Home
