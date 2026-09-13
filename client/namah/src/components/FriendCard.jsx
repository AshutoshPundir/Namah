
const FriendCard = ({friend}) => {

  return (
    <div className='flex items-center gap-2 cursor-pointer'>
      <img
            src={friend?.avatar || "../src/assets/wanderercreative-blank-profile-picture-973460.svg"}
            alt={friend?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
      <div className='flex flex-col '>
        <h1 className="text-gray-700">{friend?.username}</h1>
        <p className="text-gray-400 text-sm">{friend?.bio || "none"}</p>
      </div>
    </div>
  )
}

export default FriendCard
