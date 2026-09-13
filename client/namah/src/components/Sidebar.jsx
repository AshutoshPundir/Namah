import { useState } from 'react'
import SearchUsers from './SearchUsers';
import ConversationList from './ConversationList';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({setSelectedConversation, setShowFriendsModal, setShowProfileModal}) => {

    const [search, setSearch] = useState("");
    const { user } = useAuth();
  return (
    <div className='w-100 p-2 flex flex-col gap-4 justify-between shadow-sm'>
      
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2 px-2 pt-2 w-fit' 
        onClick={()=> setShowProfileModal(true)}>
          <img
            src={user?.avatar || "../src/assets/wanderercreative-blank-profile-picture-973460.svg"}
            alt={user?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h1>{user?.username}</h1>
        </div>
        <SearchUsers
          search={search}
          setSearch={setSearch}
          />

        {!search && (
          <ConversationList 
          setSelectedConversation={setSelectedConversation}
          />
        )}
      </div>

      <button onClick={() => 
        setShowFriendsModal(true)
      }
        // className='bg-[#d8dbdb] p-2 rounded-2xl text-gray-900 border border-[#d8dbdb] hover:border-gray-300'
        className='bg-gray-500 p-2 rounded-2xl text-white border border-[#d8dbdb] hover:bg-gray-600'
      >
        Friends
      </button>
    </div>
  )
}

export default Sidebar
