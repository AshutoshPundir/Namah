import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

const ProfileModal = ({ user, onClose }) => {
    const { navigate } = useNavigate();
    const { logout } = useAuth();

    async function logOut(e){
        e.preventDefault();
        await logout();
        navigate("/login")
    }

    return (
        <Modal onClose={onClose}>

            <div className="flex flex-col items-center">

                <img
                    src={user?.avatar || "../src/assets/wanderercreative-blank-profile-picture-973460.svg"}
                    alt={user?.username}
                    className="h-24 w-24 rounded-full object-cover"
                />

                <h2 className="mt-4 text-xl font-semibold">
                    {user?.username}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {user?.email}
                </p>

                <p className="mt-4 text-center text-gray-600">
                    {user?.bio || "No bio available"}
                </p>

                <div className="flex mt-6 gap-4">
                    <button
                        className="rounded-lg px-4 py-2 border border-black hover:shadow-md"
                    >
                        Edit Profile
                    </button>
                    <button
                        className="rounded-lg px-4 py-2 border bg-black text-gray-200  hover:text-white"
                        onClick={(e)=> logOut(e)}
                    >
                        Logout
                    </button>
                </div>

            </div>

        </Modal>
    );
};

export default ProfileModal;
