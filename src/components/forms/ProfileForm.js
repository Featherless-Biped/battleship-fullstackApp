import { useState } from "react";
// import { Button } from "react-bootstrap"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faUnlockAlt,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "./Form.css";

const ProfileForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const { token, userId, user } = useGlobalContext();

    const handleChangeProfile = async (e) => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [formData, setFormData] = useState({
        email: user.email || "",
        password: user.password || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
    });

    const [repassword, setRepassword] = useState(user.password);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeRepassword = (event) => {
        setRepassword(event.target.value);
    };

    return (
        <div className="note-form-container">
            <form className="signup-form">
                <div className="input-icon">
                    <input
                        className="form-email"
                        type="email"
                        title="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    ></input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
                <div className="input-icon">
                    <input
                        className="form-password"
                        type={showPassword ? "text" : "password"}
                        title="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                    </span>
                </div>
                <div className="input-icon">
                    <input
                        className="form-password"
                        type={showConfirmPassword ? "text" : "password"}
                        title="Password"
                        name="repassword"
                        value={repassword}
                        onChange={handleChangeRepassword}
                    ></input>
                    <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                </div>
                <div className="input-icon">
                    <input
                        className="form-firstName"
                        type="text"
                        title="First Name"
                        name="username"
                        value={formData.firstName}
                        onChange={handleChange}
                    ></input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                </div>
                <div className="input-icon">
                    <input
                        className="form-lastName"
                        type="text"
                        title="Last Name"
                        name="userlastname"
                        value={formData.lastName}
                        onChange={handleChange}
                    ></input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
                <button
                    className="form-btn-signup"
                    onClick={(e) => handleChangeProfile(e)}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
