import React from 'react';

const SearchFilterBar = ({
    searchQuery, setSearchQuery,
    filterGender, setFilterGender,
    filterStatus, setFilterStatus
}) => {
    return (
        <div className="filter-bar glass">
            <div className="search-group">
                <input
                    type="text"
                    placeholder="Search employees..."
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <select
                    className="form-control"
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    className="form-control"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <style>{`
                .filter-bar {
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    border-radius: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                }
                .search-group {
                    flex: 1;
                    min-width: 250px;
                }
                .filter-group {
                    display: flex;
                    gap: 1rem;
                }
                .filter-group select {
                    min-width: 150px;
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                   .filter-bar {
                       flex-direction: column;
                       align-items: stretch;
                   }
                   .filter-group {
                       flex-direction: column;
                   }
                }
            `}</style>
        </div>
    );
};

export default SearchFilterBar;
