import axios from "axios";
import { useEffect, useState } from "react";

const PendingRequests = ({setRefreshFriends}) => {
    
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(()=> {
        async function getPendingRequests() {
            try{

                const response = await axios.get("http://localhost:3000/api/friends/request",
                    {
                        withCredentials: true
                    }
                )
                setPendingRequests(response.data.requests);
            }catch(error){
                console.log("Pending Request Error: " + error)
            }
        }
        getPendingRequests();
    },[])

    async function handleAccept(e,pendingReq){
        e.preventDefault();
        try{

            await axios.patch("http://localhost:3000/api/friends/accept/" + pendingReq._id,
                {},
                {
                    withCredentials: true
                }
            )
            
            setPendingRequests((prevPendingReq)=> 
                prevPendingReq.filter(
                    (currentPendingReq)=> currentPendingReq._id !== pendingReq._id
                )
            )

        console.log("before toggle");

        setRefreshFriends((prev) => {
            console.log("previous:", prev);

            return !prev;
        });
        }catch(error){
            console.log("Error: " + error)
        }

    }
    async function handleReject(e,pendingReq){
        e.preventDefault();
        try{
            await axios.patch("http://localhost:3000/api/friends/reject/" + pendingReq._id,
                {},
                {
                    withCredentials: true
                }
            )
            
            setPendingRequests((prevPendingReq)=> 
                prevPendingReq.filter(
                    (currentPendingReq)=> currentPendingReq._id !== pendingReq._id
                )
            )

            setRefreshFriends((prev)=> !prev)


        }catch(error){
            console.log("Error: " + error)
        }
    }

  return (
    <div>

        {pendingRequests.map((pendingReq) => {
            return <div key={pendingReq._id}
                className="w-full flex justify-between items-center bg-white p-2 rounded"
            >
                    <div className="flex gap-2 items-center">
                    <img
                    src={pendingReq?.sender.avatar || "../src/assets/wanderercreative-blank-profile-picture-973460.svg" }
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h3>{pendingReq.sender.username}</h3>
                        <p className="text-sm text-gray-400">{pendingReq.sender.bio}</p>
                    </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="border px-2 py-1 border-gray-600 rounded-2xl hover:bg-gray-600 hover:text-white" onClick={(e) => handleAccept(e,pendingReq)}>Accept</button>
                        <button className="border px-2 py-1 border-gray-600 rounded-2xl hover:bg-gray-600 hover:text-white" onClick={(e) => handleReject(e,pendingReq)}>Reject</button>
                    </div>
                </div>
        })}
    </div>
  )
}

export default PendingRequests
