import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Table/styles.css';

const Table = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('name');

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'date', label: 'Date' },
    { id: 'amount', label: 'Amount' },
    { id: 'status', label: 'Status' },
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchColumnChange = (e) => {
    setSearchColumn(e.target.value);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter((row) => {
      const value = row[searchColumn];
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [sortedData, searchTerm, searchColumn]);

  return (
    <div className="table-container">
      <div className="search-controls">
        <select
          value={searchColumn}
          onChange={handleSearchColumnChange}
          className="search-column"
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} onClick={() => handleSort(column.id)}>
                {column.label}
                {sortConfig.key === column.id && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.id}>{row[column.id]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table; 