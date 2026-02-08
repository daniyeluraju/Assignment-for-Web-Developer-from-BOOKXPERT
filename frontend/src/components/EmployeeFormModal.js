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
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
                                value={formData.full_name}
                                onChange={handleChange}
                            />
                            {errors.full_name && <small className="text-danger">{errors.full_name}</small>}
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
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
                            <div className="form-group col">
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
                        </div>

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
                                {/* Add more as needed */}
                            </select>
                            {errors.state && <small className="text-danger">{errors.state}</small>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <div className="switch-wrapper">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={formData.status}
                                        onChange={handleChange}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <span className="status-label">
                                    {formData.status ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                            {preview && (
                                <div className="image-preview-container">
                                    <img src={preview} alt="Preview" className="image-preview" />
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">
                                {employeeToEdit ? 'Update Changes' : 'Save Employee'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Inline CSS for Modal */}
            <style>{`
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
                    max-width: 500px;
                    border-radius: 1rem;
                    display: flex;
                    flex-direction: column;
                    max-height: 90vh;
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
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                }
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    line-height: 1;
                    color: #64748b;
                }
                .form-row {
                    display: flex;
                    gap: 1rem;
                }
                .col {
                    flex: 1;
                }
                .switch-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .status-label {
                    font-weight: 500;
                    color: var(--text-main);
                }
                .image-preview-container {
                    margin-top: 1rem;
                    text-align: center;
                }
                .image-preview {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid var(--primary);
                }
                .text-danger {
                    color: #ef4444;
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    display: block;
                }
                .is-invalid {
                    border-color: #ef4444;
                }
                .btn-secondary {
                    background: #94a3b8;
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default EmployeeFormModal;
