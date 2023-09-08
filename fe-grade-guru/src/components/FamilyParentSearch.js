import React, { useContext } from 'react';
import { UserContext } from "../contexts/UserContext"
import '../styling/TablesForms.css'

const FamilyParentSearch = ({ handleParentSearch, handleAddParentClick, handleUnselectParentClick, searchParent, filteredParents, selectedParent }) => {
    const { loading } = useContext(UserContext);

    const listFilteredParents = searchParent === '' ? [] : filteredParents.map((parent) => (
        <tr key={parent.id}>
            <td>{parent.first_name}</td>
            <td>{parent.last_name}</td>
            <td>
              <button className="pure-button" onClick={() => handleAddParentClick(parent)}>+</button>
            </td>
        </tr>
    ));

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="input-group">
                <label>Search Parent by Name:</label>
                <input type="text" name="search" value={searchParent} onChange={handleParentSearch} />
            </div>
            <div className="table-container">
                <h3>Parent Search Results:</h3>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listFilteredParents}
                    </tbody>
                </table>
            </div>
            <div className="table-container">
                <h3>Selected Parent:</h3>
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedParent ? (
                            <tr key={selectedParent.id}>
                                <td>{selectedParent.first_name}</td>
                                <td>{selectedParent.last_name}</td>
                                <td>
                                    <button className="pure-button" onClick={() => handleUnselectParentClick(selectedParent)}>-</button>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FamilyParentSearch;
