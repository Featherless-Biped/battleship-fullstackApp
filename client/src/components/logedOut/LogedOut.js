import React from 'react';
import { useGlobalContext } from "../../contexts/GlobalContext";
// import SignUpModal from "./SignUpModal";
// import LogInModal from "./LogInModal";

const LogedOut = () => {
    const {
        setShowSignUpModal,
        setShowLogInModal
    } = useGlobalContext();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to the Battle!</h1>
            <p>Get ready for battle! Login to join the fight and experience intense multiplayer
                action on the front lines. Don't miss out on the action, log in now!</p>
            <button
                className='buttonsLogout'
                onClick={setShowSignUpModal}
            >Create an account</button>
            <button
                className='buttonsLogout'
                onClick={setShowLogInModal}
            >Log In</button>
        </div>
    );
};

export default LogedOut;