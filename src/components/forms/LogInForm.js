import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faUnlockAlt,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useGlobalContext } from "../../contexts/GlobalContext";

import "./Form.css";

const LogInForm = ({ setButtonClicked }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { errorsFromServer, setErrorsFromServer, setUserId, setToken } = useGlobalContext();

    useEffect(() => {
        setErrorsFromServer(false)
    }, [])

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/auth/login`,
                formData
            );
            if (res.data.token) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
                localStorage.setItem("userId", res.data.user._id);
                setUserId(res.data.user._id);
                setButtonClicked(false);
            }
            if (res.data.success) {
            }
        } catch (err) {
            console.log("This is the error message", err);
            if (err.response.data) {
                setErrorsFromServer('Username or password incorrect')
            }
        }
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="note-form-container">
            <form className="login-form">
                <div className="input-icon">
                    <input className="form-email"
                        type="email"
                        title="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    >
                    </input>
                    <span className="icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
                <div className="input-icon">
                    <input className="form-password"
                        type={showPassword ? 'text' : 'password'}
                        title="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    >
                    </input>

                    <span className='eye-icon' onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    <span className="icon">
                        <FontAwesomeIcon icon={faUnlockAlt} />
                    </span>
                </div>
                <div>
                    <button className="form-btn-login" onClick={handleLogIn}>
                        Log In
                    </button>
                    <button className="form-btn-signup-login" onClick={() => setButtonClicked('signup')}>
                        Signup
                    </button>
                </div>
                {errorsFromServer &&
                    <Alert className="form-alert">
                        {errorsFromServer}
                    </Alert>
                }
            </form>
        </div>
    );
};

export default LogInForm;
