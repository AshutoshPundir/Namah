import { useState } from "react"
import FriendList from "./FriendList"
import PendingRequests from "./PendingRequests"

const FriendsModal = ({
    setShowFriendsModal,
    refreshFriends,
    setRefreshFriends,
    setSelectedConversation
}) => {

    const [activeTab, setActiveTab] = useState("friends")
    
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center"
    onClick={()=> setShowFriendsModal(false)}
    >

        <div className="w-[600px] h-[500px] rounded-xl p-6 bg-[#e5eade]"
        onClick={(e)=> e.stopPropagation()}
        >

        {/* friend model header */}

            <div className="flex justify-between gap-4 mb-2 p-2 rounded-md text-gray-800  ">
                <div className="flex justify-between gap-4 ">    
                    <button onClick={()=> {
                        setActiveTab("friends")
                    }}
                    className={`hover:text-gray-500 border-b-2 px-2 py-1 rounded `}
                    >
                        Friends
                    </button>

                    <button  onClick={()=> {
                        setActiveTab("requests")
                    }}
                    className={`hover:text-gray-500 border-b-2 px-2 py-1 rounded`}
                    >
                        Requests
                    </button>
                </div>
       
                
                <div className="w-5 flex justify-center items-center rounded-4xl text-sm">

                <button onClick={()=> {
                    setShowFriendsModal(false)
                }}
                className= "rounded-4xl text-sm w-5 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                </div>
            </div>
            
            <div className="h-[1.2px] mb-4 bg-white rounded-2xl"></div>
            {activeTab === 'friends' ? (
                <FriendList 
                    refreshFriends={refreshFriends}
                    setSelectedConversation={setSelectedConversation}
                    setShowFriendsModal={setShowFriendsModal}
                />
            ) : (
                <PendingRequests 
                    setRefreshFriends={setRefreshFriends}
                />
            )}
        </div>
      
    </div>
  )
}

export default FriendsModal
