// import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import { createContext, useContext, useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

import SignUpModal from "../modals/SignUpModal";
import LogInModal from "../modals/LogInModal";
import { useNavigate } from 'react-router-dom';

import './NavBar.css';
import { useEffect, useState } from "react";

const NavBar = () => {
    const navigate = useNavigate();
    const {
        showSignUpModal,
        showLogInModal,
        setShowSignUpModal,
        setShowLogInModal,
        token,
        setToken,
        userId,
        setUserId
    } = useGlobalContext();

    let activeStyle = {
        fontWeight: 'bold',
        color: 'black'
    };

    const [logedIn, setLogedIn] = useState(token ? true : false)

    useEffect(() => {
        setLogedIn(token ? true : false)
        console.log(logedIn);
    }, [token])


    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken('');
        setUserId('');
        setLogedIn(false)
        // setShowLogInModal(false)
    }

    const handleLogIn = () => {
        setShowLogInModal(true)
    }

    return (
        <>
            <div className="nav-bar">
                <ul>
                    <li>
                        <NavLink
                            to=""
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined}
                        >
                            Home
                        </NavLink>
                    </li>
                    {/* {logedIn && */}
                    <li>
                        <NavLink
                            to="game/:id"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined}
                        >
                            Play
                        </NavLink>
                    </li>
                    {/* } */}
                    {/* {logedIn && */}
                    <li>
                        <NavLink
                            to="profile"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined}
                        >
                            Profile
                        </NavLink>
                    </li>
                    {/* } */}
                    <div className="align-right">
                        {!logedIn &&
                            <li>
                                <Button onClick={setShowSignUpModal}>SignUp</Button>
                            </li>
                        }
                        <li>
                            <Button onClick={logedIn ? handleLogOut : handleLogIn}>{logedIn ? 'LogOut' : 'LogIn'}</Button>
                        </li>
                    </div>
                </ul>
            </div>
            <SignUpModal
                visible={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
            />
            <LogInModal
                visible={showLogInModal}
                onClose={() => setShowLogInModal(false)}
                setToken={setToken}
                setUserId={setUserId}
            />
        </>

    );
};

export default NavBar;