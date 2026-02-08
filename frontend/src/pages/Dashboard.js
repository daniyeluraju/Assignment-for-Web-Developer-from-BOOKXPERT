import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import Sidebar from '../components/Sidebar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeFormModal from '../components/EmployeeFormModal';
import EmployeeViewModal from '../components/EmployeeViewModal';
import SearchFilterBar from '../components/SearchFilterBar';
import { FaUsers, FaUserCheck, FaUserTimes, FaPlus, FaPrint } from 'react-icons/fa';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterGender, setFilterGender] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    // View Modal State
    const [showViewModal, setShowViewModal] = useState(false);
    const [employeeToView, setEmployeeToView] = useState(null);

    // Fetch Employees
    const fetchEmployees = async () => {
        try {
            const res = await axios.get('/employees');
            setEmployees(res.data);
            setFilteredEmployees(res.data);
        } catch (err) {
            console.error("Error fetching employees", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = employees;

        if (searchQuery) {
            result = result.filter(emp =>
                emp.full_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterGender !== 'All') {
            result = result.filter(emp => emp.gender === filterGender);
        }

        if (filterStatus !== 'All') {
            const isActive = filterStatus === 'Active';
            result = result.filter(emp => Boolean(emp.status) === isActive);
        }

        setFilteredEmployees(result);
    }, [employees, searchQuery, filterGender, filterStatus]);

    // Handlers
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/employees/${id}`);
            fetchEmployees();
        } catch (err) {
            console.error("Error deleting", err);
        }
    };

    const handleStatusChange = async (id) => {
        try {
            await axios.put(`/employees/status/${id}`);
            fetchEmployees();
        } catch (err) {
            console.error("Error updating status", err);
        }
    };

    // Stats
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status).length;
    const inactiveEmployees = totalEmployees - activeEmployees;

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <div className="dashboard-header">
                    <h1>Employee Dashboard</h1>
                    <div className="header-actions">
                        <button className="btn btn-secondary" onClick={() => window.print()}>
                            <FaPrint /> Print
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setEmployeeToEdit(null);
                                setShowModal(true);
                            }}
                        >
                            <FaPlus /> Add Employee
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="card glass animate-fade-in" style={{ animationDelay: '0.1s' }} onClick={() => setFilterStatus('All')}>
                        <div className="card-icon blue"><FaUsers /></div>
                        <div className="card-info">
                            <h3>{totalEmployees}</h3>
                            <p>Total Employees</p>
                        </div>
                    </div>
                    <div className="card glass animate-fade-in" style={{ animationDelay: '0.2s' }} onClick={() => setFilterStatus('Active')}>
                        <div className="card-icon green"><FaUserCheck /></div>
                        <div className="card-info">
                            <h3>{activeEmployees}</h3>
                            <p>Active Employees</p>
                        </div>
                    </div>
                    <div className="card glass animate-fade-in" style={{ animationDelay: '0.3s' }} onClick={() => setFilterStatus('Inactive')}>
                        <div className="card-icon red"><FaUserTimes /></div>
                        <div className="card-info">
                            <h3>{inactiveEmployees}</h3>
                            <p>Inactive Employees</p>
                        </div>
                    </div>
                </div>

                {/* Search & Filter */}
                <SearchFilterBar
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    filterGender={filterGender} setFilterGender={setFilterGender}
                    filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                />

                {/* Table */}
                <EmployeeTable
                    employees={filteredEmployees}
                    onDelete={handleDelete}
                    onEdit={(emp) => {
                        setEmployeeToEdit(emp);
                        setShowModal(true);
                    }}
                    onStatusChange={handleStatusChange}
                    onView={(emp) => {
                        setEmployeeToView(emp);
                        setShowViewModal(true);
                    }}
                />

                {/* Modal */}
                <EmployeeFormModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    employeeToEdit={employeeToEdit}
                    onSave={fetchEmployees}
                />

                {/* View Modal */}
                <EmployeeViewModal
                    show={showViewModal}
                    handleClose={() => setShowViewModal(false)}
                    employee={employeeToView}
                />
            </div>

            <style>{`
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                .dashboard-header h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    color: var(--text-main);
                }
                .header-actions {
                    display: flex;
                    gap: 0.75rem;
                }
                .summary-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .card {
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .card-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                }
                .card:hover .card-icon {
                    transform: none; /* No rotation for professional look */
                }
                .card-icon.blue { 
                    background: var(--primary); 
                    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
                }
                .card-icon.green { 
                    background: var(--success); 
                    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
                }
                .card-icon.red { 
                    background: #ef4444; 
                    box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
                }
                
                .card-info h3 {
                    font-size: 2rem;
                    margin-bottom: 0px;
                    color: var(--text-main);
                    font-weight: 700;
                }
                .card-info p {
                    color: var(--text-light);
                    font-weight: 500;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }
                .btn-secondary {
                    background: #64748b;
                    color: white;
                }
                .btn-secondary:hover {
                    background: #475569;
                }
                @media print {
                    .dashboard-header,
                    .summary-cards,
                    .filter-bar {
                        display: none !important;
                    }
                    .main-content {
                        padding: 0 !important;
                        background: white !important;
                    }
                    .app-container {
                        height: auto !important;
                        overflow: visible !important;
                    }
                    /* Ensure table fits */
                    .table-container {
                        width: 100%;
                        overflow: visible;
                        box-shadow: none;
                        border: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
