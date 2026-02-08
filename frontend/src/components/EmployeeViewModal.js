import React from 'react';

const EmployeeViewModal = ({ show, handleClose, employee }) => {
    if (!show || !employee) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-container glass animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Employee Details</h3>
                    <button className="close-btn" onClick={handleClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="view-profile-section">
                        <div className="profile-image-large">
                            {employee.profile_image ? (
                                <img
                                    src={`http://localhost:8081/uploads/${employee.profile_image}`}
                                    alt={employee.full_name}
                                />
                            ) : (
                                <div className="profile-placeholder-large">
                                    {employee.full_name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <h2 className="profile-name">{employee.full_name}</h2>
                        <span className={`status-badge ${employee.status ? 'active' : 'inactive'}`}>
                            {employee.status ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="view-details-grid">
                        <div className="detail-item">
                            <label>ID</label>
                            <p>#{employee.id}</p>
                        </div>
                        <div className="detail-item">
                            <label>Gender</label>
                            <p>{employee.gender}</p>
                        </div>
                        <div className="detail-item">
                            <label>Date of Birth</label>
                            <p>{new Date(employee.dob).toLocaleDateString()}</p>
                        </div>
                        <div className="detail-item">
                            <label>State</label>
                            <p>{employee.state}</p>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={handleClose}>Close</button>
                </div>
            </div>

            <style>{`
                .view-profile-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 2rem;
                    text-align: center;
                }
                .profile-image-large {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 4px solid white;
                }
                .profile-image-large img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .profile-placeholder-large {
                    width: 100%;
                    height: 100%;
                    background: var(--primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    font-weight: bold;
                }
                .profile-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 0.5rem;
                }
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
                .status-badge.active {
                    background: #dcfce7;
                    color: #166534;
                }
                .status-badge.inactive {
                    background: #fee2e2;
                    color: #991b1b;
                }
                .view-details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    background: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 1rem;
                }
                .detail-item label {
                    display: block;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--text-light);
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .detail-item p {
                    font-weight: 500;
                    color: var(--text-main);
                    font-size: 1rem;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(5px);
                }
                .modal-container {
                    background: white;
                    width: 90%;
                    max-width: 450px;
                    border-radius: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    max-height: 90vh;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                .modal-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-body {
                    padding: 1.5rem;
                    overflow-y: auto;
                }
                .modal-footer {
                    padding: 1rem 1.5rem;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: flex-end;
                }
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    color: #64748b;
                    transition: color 0.2s;
                }
                .close-btn:hover {
                    color: #0f172a;
                }
            `}</style>
        </div>
    );
};

export default EmployeeViewModal;
