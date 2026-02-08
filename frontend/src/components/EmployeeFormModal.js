import React, { useState, useEffect } from 'react';
import axios from '../services/api';


const EmployeeFormModal = ({ show, handleClose, employeeToEdit, onSave }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        gender: 'Male',
        dob: '',
        state: '',
        status: true,
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (employeeToEdit) {
            setFormData({
                full_name: employeeToEdit.full_name,
                gender: employeeToEdit.gender,
                dob: employeeToEdit.dob ? employeeToEdit.dob.split('T')[0] : '',
                state: employeeToEdit.state,
                status: employeeToEdit.status,
                image: null
            });
            setPreview(employeeToEdit.profile_image ? `http://localhost:8081/uploads/${employeeToEdit.profile_image}` : null);
        } else {
            // Reset for Add Mode
            setFormData({
                full_name: '',
                gender: 'Male',
                dob: '',
                state: '',
                status: true,
                image: null
            });
            setPreview(null);
        }
        setErrors({});
    }, [employeeToEdit, show]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.full_name) tempErrors.full_name = "Full Name is required";
        if (!formData.dob) tempErrors.dob = "Date of Birth is required";
        if (!formData.state) tempErrors.state = "State is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        data.append('full_name', formData.full_name);
        data.append('gender', formData.gender);
        data.append('dob', formData.dob);
        data.append('state', formData.state);
        data.append('status', formData.status ? 1 : 0); // Convert boolean to 1/0
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (employeeToEdit) {
                await axios.put(`/employees/${employeeToEdit.id}`, data);
            } else {
                await axios.post('/employees', data);
            }
            onSave();
            handleClose();
        } catch (err) {
            console.error(err);
            alert("Failed to save employee");
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container glass animate-fade-in">
                <div className="modal-header">
                    <h3>{employeeToEdit ? 'Edit Employee' : 'Add New Employee'}</h3>
                    <button className="close-btn" onClick={handleClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        {/* Profile Image Section - Centered at the top */}
                        <div className="image-upload-section">
                            <div className="image-preview-wrapper" onClick={() => document.getElementById('profile-image-input').click()}>
                                {preview ? (
                                    <img src={preview} alt="Profile" className="profile-preview-img" />
                                ) : (
                                    <div className="profile-placeholder">
                                        <span>+</span>
                                    </div>
                                )}
                                <div className="image-edit-badge">
                                    <i className="fas fa-camera"></i>
                                </div>
                            </div>
                            <input
                                id="profile-image-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <p className="image-hint">Click to upload profile photo</p>
                        </div>

                        <div className="form-grid">
                            {/* Full Name - Span Full Width */}
                            <div className="form-group span-full">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="Enter employee's full name"
                                    className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                    value={formData.full_name}
                                    onChange={handleChange}
                                />
                                {errors.full_name && <small className="text-danger">{errors.full_name}</small>}
                            </div>

                            {/* Gender & DOB - Row 2 */}
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                                {errors.dob && <small className="text-danger">{errors.dob}</small>}
                            </div>

                            {/* State & Status - Row 3 */}
                            <div className="form-group">
                                <label className="form-label">State</label>
                                <select
                                    name="state"
                                    className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                    value={formData.state}
                                    onChange={handleChange}
                                >
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                                {errors.state && <small className="text-danger">{errors.state}</small>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <div className="switch-wrapper status-field">
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="status"
                                            checked={formData.status}
                                            onChange={handleChange}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    <span className={`status-text ${formData.status ? 'active' : 'inactive'}`}>
                                        {formData.status ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary-outline" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary-gradient">
                                {employeeToEdit ? 'Update Changes' : 'Add Employee'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Extended CSS for Professional Modal Layout */}
            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.65);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    backdrop-filter: blur(8px);
                    padding: 20px;
                }
                .modal-container {
                    background: #ffffff;
                    width: 100%;
                    max-width: 550px;
                    border-radius: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .modal-header {
                    padding: 1.5rem 2rem;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .modal-header h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }
                .close-btn {
                    background: #f1f5f9;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #64748b;
                    transition: all 0.2s;
                }
                .close-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }
                .modal-body {
                    padding: 2rem;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                /* Image Section */
                .image-upload-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .image-preview-wrapper {
                    position: relative;
                    width: 110px;
                    height: 110px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .image-preview-wrapper:hover {
                    transform: scale(1.05);
                }
                .profile-preview-img, .profile-placeholder {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #fff;
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
                }
                .profile-placeholder {
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #94a3b8;
                    border: 2px dashed #cbd5e1;
                }
                .image-edit-badge {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: #2563eb;
                    color: white;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 2px solid #fff;
                }
                .image-hint {
                    font-size: 0.8rem;
                    color: #64748b;
                    margin-top: 0.75rem;
                    font-weight: 500;
                }

                /* Grid System */
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .span-full {
                    grid-column: span 2;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #475569;
                }
                .form-control {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.625rem;
                    font-size: 0.9375rem;
                    background: #f8fafc;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .form-control:focus {
                    background: #fff;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                    outline: none;
                }
                
                /* Selection & Date resets */
                select.form-control {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1rem;
                    padding-right: 2.5rem;
                }

                /* Status Switch Customization */
                .status-field {
                    height: 44px;
                    display: flex;
                    align-items: center;
                    padding: 0 0.5rem;
                }
                .status-text {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    transition: color 0.2s;
                }
                .status-text.active { color: #10b981; }
                .status-text.inactive { color: #64748b; }

                /* Footer Buttons */
                .modal-footer {
                    grid-column: span 2;
                    margin-top: 2.5rem;
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    border-top: 1px solid #f1f5f9;
                    padding-top: 1.5rem;
                }
                .btn {
                    padding: 0.8rem 1.75rem;
                    border-radius: 0.75rem;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-secondary-outline {
                    background: #fff;
                    color: #64748b;
                    border: 1px solid #cbd5e1;
                }
                .btn-secondary-outline:hover {
                    background: #f8fafc;
                    border-color: #94a3b8;
                    color: #1e293b;
                }
                .btn-primary-gradient {
                    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                    color: white;
                    border: none;
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
                }
                .btn-primary-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 20px -5px rgba(37, 99, 235, 0.4);
                }

                @media (max-width: 500px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .span-full { grid-column: span 1; }
                    .modal-footer { flex-direction: column-reverse; }
                    .btn { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default EmployeeFormModal;
