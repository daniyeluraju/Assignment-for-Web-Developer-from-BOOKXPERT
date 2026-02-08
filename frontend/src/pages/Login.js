import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const Login = () => {
    // State management
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [eyeStyle, setEyeStyle] = useState({ width: '0px', height: '0px' });

    const navigate = useNavigate();

    // Mouse movement effect for panda eyes
    useEffect(() => {
        const handleMouseMove = (event) => {
            const dw = document.documentElement.clientWidth / 15;
            const dh = document.documentElement.clientHeight / 15;
            const x = event.pageX / dw;
            const y = event.pageY / dh;
            setEyeStyle({ width: `${x}px`, height: `${y}px` });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset wrong state
        setIsWrong(false);

        // Simple validation or proceed to API
        if (!username || !password) {
            triggerWrongEntry();
            return;
        }

        try {
            // Adjust API call as needed based on your backend logic
            // Assuming username is email
            const res = await axios.post('/login', { email: username, password });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } else {
                triggerWrongEntry();
            }
        } catch (err) {
            console.error("Login failed", err);
            triggerWrongEntry();
        }
    };

    const triggerWrongEntry = () => {
        setIsWrong(true);
        setTimeout(() => {
            setIsWrong(false);
        }, 3000);
    };

    return (
        <div className="login-page-container">
            {/* Dynamic Background Effects */}
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>
            <div className="bg-shape shape-3"></div>

            <div className="content-wrapper">
                <div className="panda">
                    <div className="ear"></div>
                    <div className="face">
                        <div className="eye-shade"></div>
                        <div className="eye-white">
                            <div className="eye-ball" style={eyeStyle}></div>
                        </div>
                        <div className="eye-shade rgt"></div>
                        <div className="eye-white rgt">
                            <div className="eye-ball" style={eyeStyle}></div>
                        </div>
                        <div className="nose"></div>
                        <div className="mouth"></div>
                    </div>
                    <div className="body"> </div>
                    <div className="foot">
                        <div className="finger"></div>
                    </div>
                    <div className="foot rgt">
                        <div className="finger"></div>
                    </div>
                </div>

                <form
                    className={`${isPasswordFocused ? 'up' : ''} ${isWrong ? 'wrong-entry' : ''}`}
                    onSubmit={handleLogin}
                >
                    <div className="hand"></div>
                    <div className="hand rgt"></div>
                    <h1>Login</h1>

                    <div className="form-group">
                        <input
                            required
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label">Username</label>
                    </div>

                    <div className="form-group">
                        <input
                            id="password"
                            type="password"
                            required
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                        />
                        <label className="form-label">Password</label>
                        <p className="alert">Invalid Credentials..!!</p>
                        <button type="submit" className="btn">Sign In</button>
                    </div>
                </form>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css?family=Dancing+Script|Roboto|Inter');

                * { box-sizing: border-box; }
                
                /* Professional Dark Corporate Background */
                .login-page-container {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                /* Dynamic Background Shapes */
                .bg-shape {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.4;
                    z-index: 0;
                    animation: float 20s infinite ease-in-out;
                }
                .shape-1 {
                    width: 500px;
                    height: 500px;
                    background: #2563eb; /* Royal Blue */
                    top: -100px;
                    left: -100px;
                    animation-delay: 0s;
                }
                .shape-2 {
                    width: 400px;
                    height: 400px;
                    background: #64748b; /* Slate */
                    bottom: -50px;
                    right: -50px;
                    animation-delay: -5s;
                }
                .shape-3 {
                    width: 300px;
                    height: 300px;
                    background: #4f46e5; /* Indigo */
                    top: 40%;
                    left: 60%;
                    animation-delay: -10s;
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, -50px); }
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 450px; /* Slightly wider for professional feel */
                }

                /* ---- PANDA CSS (Preserved functionally) ---- */
                .panda {
                    position: relative;
                    width: 200px;
                    margin: 0 auto 50px auto; /* 50px bottom margin */
                }

                .face {
                    width: 200px;
                    height: 200px;
                    background: #fff;
                    border-radius: 100%;
                    margin: 50px auto;
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
                    z-index: 50;
                    position: relative;
                }

                .ear, .ear:after {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    background: #000;
                    z-index: 5;
                    border: 10px solid #fff;
                    left: -15px;
                    top: -15px;
                    border-radius: 100%;
                }
                .ear:after {
                    content: '';
                    left: 125px;
                }

                .eye-shade {
                    background: #000;
                    width: 50px;
                    height: 80px;
                    margin: 10px;
                    position: absolute;
                    top: 35px;
                    left: 25px;
                    transform: rotate(220deg);
                    border-radius: 25px/20px 30px 35px 40px;
                }
                .eye-shade.rgt {
                    transform: rotate(140deg);
                    left: 105px;
                }

                .eye-white {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    background: #fff;
                    z-index: 500;
                    left: 40px;
                    top: 80px;
                    overflow: hidden;
                }
                .eye-white.rgt {
                    right: 40px;
                    left: auto;
                }

                .eye-ball {
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    left: 20px;
                    top: 20px;
                    max-width: 10px;
                    max-height: 10px;
                    transition: 0.1s;
                }
                .eye-ball:after {
                    content: '';
                    background: #000;
                    position: absolute;
                    border-radius: 100%;
                    right: 0;
                    bottom: 0px;
                    width: 20px;
                    height: 20px;
                }

                .nose {
                    position: absolute;
                    height: 20px;
                    width: 35px;
                    bottom: 40px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    border-radius: 50px 20px/30px 15px;
                    transform: rotate(15deg);
                    background: #000;
                }

                .body {
                    background: #fff;
                    position: absolute;
                    top: 200px;
                    left: -20px;
                    border-radius: 100px 100px 100px 100px/126px 126px 96px 96px;
                    width: 250px;
                    height: 282px;
                    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
                }

                .hand, .hand:after, .hand:before {
                    width: 40px;
                    height: 30px;
                    border-radius: 50px;
                    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
                    background: #000;
                    margin: 5px;
                    position: absolute;
                    top: 70px;
                    left: -25px;
                }
                .hand:after, .hand:before {
                    content: '';
                    left: -5px;
                    top: 11px;
                }
                .hand:before {
                    top: 26px;
                }
                .hand.rgt, .rgt.hand:after, .rgt.hand:before {
                    left: auto;
                    right: -25px;
                }
                .hand.rgt:after, .hand.rgt:before {
                    left: auto;
                    right: -5px;
                }

                .foot {
                    top: 360px;
                    left: -80px;
                    position: absolute;
                    background: #000;
                    z-index: 1400;
                    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
                    border-radius: 40px 40px 39px 40px/26px 26px 63px 63px;
                    width: 82px;
                    height: 120px;
                }
                .foot:after {
                    content: '';
                    width: 55px;
                    height: 65px;
                    background: #222;
                    border-radius: 100%;
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    right: 0;
                    margin: auto;
                }
                .foot .finger, .foot .finger:after, .foot .finger:before {
                    position: absolute;
                    width: 25px;
                    height: 35px;
                    background: #222;
                    border-radius: 100%;
                    top: 10px;
                    right: 5px;
                }
                .foot .finger:after, .foot .finger:before {
                    content: '';
                    right: 30px;
                    width: 20px;
                    top: 0;
                }
                .foot .finger:before {
                    right: 55px;
                    top: 5px;
                }
                .foot.rgt {
                    left: auto;
                    right: -80px;
                }
                .foot.rgt .finger, .foot.rgt .finger:after, .foot.rgt .finger:before {
                    left: 5px;
                    right: auto;
                }
                .foot.rgt .finger:after {
                    left: 30px;
                    right: auto;
                }
                .foot.rgt .finger:before {
                    left: 55px;
                    right: auto;
                }

                /* ---- FORM STYLES (Upgraded for Professional Look) ---- */
                form {
                    display: block;
                    width: 100%;
                    max-width: 400px;
                    padding: 2rem 2.5rem;
                    
                    /* Glassmorphism Upgrade */
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    
                    height: auto; /* Allow auto height */
                    min-height: 320px;
                    margin: auto;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                    
                    transition: 0.3s;
                    position: relative;
                    transform: translateY(-100px);
                    z-index: 500;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 1rem;
                }
                form.up {
                    transform: translateY(-180px);
                }

                h1 {
                    color: #1e293b; /* Slate 800 - Professional Dark */
                    font-family: 'Inter', sans-serif;
                    font-weight: 800;
                    font-size: 1.8rem;
                    margin-bottom: 2rem;
                    letter-spacing: -0.05em;
                }

                .btn {
                    /* Professional Blue Gradient */
                    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                    padding: 0.8rem;
                    width: 100%;
                    border: none;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.4);
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    display: block;
                }
                .btn:hover {
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.5);
                    transform: translateY(-1px);
                    color: white;
                }
                .btn:active {
                    transform: translateY(0);
                }
                .btn:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
                }

                .form-group {
                    position: relative;
                    font-size: 15px;
                    color: #64748b; /* Slate 500 */
                }
                .form-group + .form-group {
                    margin-top: 1.5rem;
                }
                .form-group .form-label {
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    top: 5px;
                    transition: 0.3s;
                    pointer-events: none;
                    color: #94a3b8; /* Slate 400 */
                    font-weight: 500;
                }
                .form-group .form-control {
                    width: 100%;
                    position: relative;
                    z-index: 3;
                    height: 40px;
                    background: transparent;
                    border: none;
                    padding: 5px 0;
                    transition: 0.3s;
                    border-bottom: 2px solid #e2e8f0; /* Slate 200 */
                    color: #334155; /* Slate 700 */
                    font-size: 1rem;
                    font-weight: 500;
                }
                .form-group .form-control:invalid {
                    outline: none;
                }
                .form-group .form-control:focus, 
                .form-group .form-control:valid,
                .form-control[value]:not([value=""]) {
                    outline: none;
                    box-shadow: none;
                    border-color: #2563eb; /* Primary Blue */
                }
                
                .form-group .form-control:focus + .form-label, 
                .form-group .form-control:valid + .form-label,
                .form-control[value]:not([value=""]) + .form-label {
                    font-size: 0.8rem;
                    color: #2563eb; /* Primary Blue */
                    transform: translateY(-20px);
                    font-weight: 600;
                }

                .alert {
                    position: absolute;
                    color: #ef4444; /* Danger Red */
                    font-size: 0.9rem;
                    font-weight: 600;
                    background: white;
                    border: 1px solid #fee2e2;
                    
                    /* Adjusted positioning */
                    right: -140px;
                    top: -140px; 
                    
                    z-index: 200;
                    padding: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    border-radius: 1rem;
                    
                    opacity: 0;
                    transform: scale(0);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                .wrong-entry .alert {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .alert:after {
                    content: '';
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    background: white;
                    border-bottom: 1px solid #fee2e2;
                    border-right: 1px solid #fee2e2;
                    left: -8px;
                    bottom: 15px;
                    transform: rotate(135deg);
                }

                .wrong-entry {
                    animation: wrong-log 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                }
                
                @keyframes wrong-log {
                    10%, 90% { transform: translate3d(-1px, 0, 0) translateY(-100px); }
                    20%, 80% { transform: translate3d(2px, 0, 0) translateY(-100px); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0) translateY(-100px); }
                    40%, 60% { transform: translate3d(4px, 0, 0) translateY(-100px); }
                }

                @media (max-width: 600px) {
                   .panda { transform: scale(0.8); }
                   form { width: 90%; transform: translateY(-50px); }
                   form.up { transform: translateY(-130px); }
                   .bg-shape { opacity: 0.2; }
                }
            `}</style>
        </div>
    );
};

export default Login;
