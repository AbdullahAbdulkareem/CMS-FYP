import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { jwtDecode } from 'jwt-decode'; // Use named import



export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isToggled, setIsToggled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            if ( !email || !password || !confirmPassword) {
                setError("All fields are required");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const response = await axios.post("http://localhost:3001/auth/register", {
                email,
                password,
            });

            if (response.status === 200) {
                console.log(response.data);
                setMessage("Registration successful");
                setError('');
            } else {
                console.error('Failed to register:', response.status);
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError("Registration failed. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (!email || !password) {
                setError("Email and password are required");
                return;
            }

            const response = await axios.post("http://localhost:3001/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                if (response.data.Status === "Success") {
                    navigate("/home");
                } else {
                    console.error('Failed to login:', response.data);
                    setError("Login failed. Please try again.");
                }
            } else {
                console.error('Failed to login:', response.status);
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("Login failed. Please try again.");
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        console.log(credentialResponse);

        try {
            const decodedToken = jwtDecode(credentialResponse?.credential);
            if (decodedToken) {
                const { name, email } = decodedToken;
                localStorage.setItem("token", credentialResponse.credential);
                localStorage.setItem("profileData", JSON.stringify({ name, email }));
                navigate("/home");
            } else {
                console.log("Unable to fetch user information from Google login");
            }
        } catch (error) {
            console.log("Error decoding token: ", error);
        }
    };

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
    };

    return (
      <div className="wrapper">
                <div className="card-switch">
                    <label className="switch">
                        <input
                            type="checkbox"
                            className="toggle2"
                            checked={isToggled}
                            onChange={() => setIsToggled(!isToggled)}
                        />
                        <span className="slider"></span>
                        <span className="card-side"></span>
                    </label>
                </div>
                <div className={`flip-card__inner ${isToggled ? "flipped" : ""}`}>
                    <div className="flip-card__front">
                        <div className="title">Log in</div>
                        <form
                            className="flip-card__form"
                            onSubmit={handleLogin}
                        >
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginError}
                            />
                            <input
                                className="flip-card__input"
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="password_field">
                                <input
                                    className="flip-card__input"
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {showPassword ? (
                                    <EyeSlashFill
                                        className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <EyeFill
                                        className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            </div>
                            <button className="flip-card__btn">Let's go!</button>
                        </form>
                    </div>
                    <div className="flip-card__back">
                        <div className="title">Sign up</div>
                        <form
                            className="flip-card__form"
                            onSubmit={handleSignUp}
                        >
                            <input
                                className="flip-card__input"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="flip-card__input"
                                name="password"
                                placeholder="Password"
                                type="password"
                                min="8"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                className="flip-card__input"
                                name="password"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {message && <p style={{ color: 'green' }}>{message}</p>}
                            <button type="submit" className="flip-card__btn">
                                Confirm!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    );
}
