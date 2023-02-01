import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

// const Profile = ({ currentUserName, handleCurrentUserName }) => {
const Profile = () => {

    // const { currentUserName } = useUserContext();

    // const { handleUserName } = useUserContext();

    const [newUserName, setNewUserName] = useState('')

    // const handleClick = () => {
    //     handleUserName(newUserName)
    // }
    return (
        <>
            <div className="profile-container">
                <div className="profile-title-section">
                    <h1>Profile</h1>
                </div>
                <p>User Profile</p>
                <input
                    className="username-text-box"
                    type="text"
                    value={newUserName}
                // onChange={(e) => setNewUserName(e.target.value)}
                >
                </input>
                <div className="profile-button-section">
                    <button
                        className="save-profile-button"
                    // onClick={handleClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
