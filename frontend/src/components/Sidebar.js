import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaChartPie } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="sidebar glass">
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <nav className="sidebar-nav">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    <FaChartPie className="nav-icon" /> Dashboard
                </NavLink>
                {/* Add more links here if needed */}
                <div className="nav-link logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" /> Logout
                </div>
            </nav>

            <style>{`
                .sidebar {
                    width: 260px;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    background: #0f172a; /* Slate 900 */
                    color: white;
                    border-right: 1px solid #1e293b;
                    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
                    z-index: 10;
                    margin: 0; /* Reset floating margin */
                    border-radius: 0; /* Reset rounded corners */
                }
                .sidebar-header {
                    padding: 2rem;
                    border-bottom: 1px solid #1e293b;
                }
                .sidebar-header h3 {
                    font-weight: 600;
                    color: white;
                    font-size: 1.25rem;
                    letter-spacing: 0.02em;
                }
                .sidebar-nav {
                    padding: 1rem 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem 1rem;
                    color: #94a3b8;
                    transition: all 0.2s;
                    cursor: pointer;
                    font-weight: 500;
                    border-radius: 0.5rem;
                    margin: 0;
                }
                .nav-link:hover, .nav-link.active {
                    color: white;
                    background: #1e293b; /* Slate 800 */
                }
                .nav-link.active {
                    background: #2563eb; /* Royal Blue */
                    color: white;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    border: none;
                }
                .nav-icon {
                    margin-right: 1rem;
                    font-size: 1.2rem;
                }
                .logout-btn {
                    margin-top: auto;
                    color: #ef4444;
                }
                .logout-btn:hover {
                    background: rgba(239, 68, 68, 0.1);
                    color: #fca5a5;
                    border-right: none;
                }
                @media print {
                    .sidebar {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
