import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const EmployeeTable = ({ employees, onEdit, onDelete, onStatusChange, onView }) => {
    return (
        <div className="table-container glass animate-fade-in">
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>State</th>
                        <th>Status</th>
                        <th className="action-col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp, index) => (
                            <tr key={emp.id} className="table-row">
                                <td>#{emp.id}</td>
                                <td>
                                    <div className="profile-img-container">
                                        {emp.profile_image ? (
                                            <img
                                                src={`http://localhost:8081/uploads/${emp.profile_image}`}
                                                alt={emp.full_name}
                                                className="profile-img"
                                            />
                                        ) : (
                                            <div className="profile-placeholder">
                                                {emp.full_name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>{emp.full_name}</td>
                                <td>{emp.gender}</td>
                                <td>{new Date(emp.dob).toLocaleDateString()}</td>
                                <td>{emp.state}</td>
                                <td>
                                    <div className="no-print">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={emp.status}
                                                onChange={() => onStatusChange(emp.id)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <span className="print-only">
                                        {emp.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon view"
                                            onClick={() => onView(emp)}
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            className="btn-icon edit"
                                            onClick={() => onEdit(emp)}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn-icon delete"
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this employee?")) {
                                                    onDelete(emp.id);
                                                }
                                            }}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="empty-state">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <style>{`
                .table-container {
                    overflow-x: auto;
                    border-radius: 1.5rem;
                }
                .employee-table {
                    width: 100%;
                    border-collapse: separate; /* Changed for border-radius on rows */
                    border-spacing: 0 0.5rem; /* Gap between rows */
                    margin-top: -0.5rem;
                }
                .employee-table th, .employee-table td {
                    padding: 1.25rem 1.5rem;
                    text-align: left;
                    border: none;
                }
                .employee-table th {
                    background: transparent;
                    color: var(--text-light);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.8rem;
                }
                .table-row {
                    background: rgba(255, 255, 255, 0.4);
                    transition: all 0.3s ease;
                }
                .table-row td:first-child {
                    border-top-left-radius: 1rem;
                    border-bottom-left-radius: 1rem;
                }
                .table-row td:last-child {
                    border-top-right-radius: 1rem;
                    border-bottom-right-radius: 1rem;
                }
                .table-row:hover {
                    background: rgba(255, 255, 255, 0.8) !important;
                    transform: scale(1.01);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                }
                .profile-img, .profile-placeholder {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    object-fit: cover;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .profile-placeholder {
                    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                .action-buttons {
                    display: flex;
                    gap: 0.75rem;
                }
                .btn-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .btn-icon.view {
                    background: #e2e8f0;
                    color: #475569;
                }
                .btn-icon.view:hover {
                    background: #cbd5e1;
                    color: #0f172a;
                }
                .btn-icon.edit {
                    background: #dbeafe;
                    color: #2563eb;
                } 
                .btn-icon.edit:hover {
                    background: #2563eb;
                    color: white;
                }
                .btn-icon.delete {
                    background: #fee2e2;
                    color: #dc2626;
                }
                .btn-icon.delete:hover {
                    background: #dc2626;
                    color: white;
                }
                .empty-state {
                    text-align: center;
                    padding: 3rem !important;
                    color: #94a3b8;
                }
                .print-only {
                    display: none; 
                }
                @media print {
                    .action-col {
                        display: none;
                    }
                    .table-row td:last-child {
                        display: none;
                    }
                    .no-print {
                        display: none;
                    }
                    .print-only {
                        display: block;
                        font-weight: 500;
                    }
                }
            `}</style>
        </div>
    );
};

export default EmployeeTable;
