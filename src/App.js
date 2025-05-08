import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import Table from './components/Table';

/**
 * Main application component
 * Manages the state and data flow between Calendar and Table components
 */
function App() {
  // State for storing the selected date range and timezone
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    timeZone: 'UTC'
  });

  // Sample data for the table
  const tableData = [
    { name: 'Event 1', date: '2024-03-15', amount: '$100', status: 'Completed' },
    { name: 'Event 2', date: '2024-03-16', amount: '$200', status: 'Pending' },
    { name: 'Event 3', date: '2024-03-17', amount: '$150', status: 'In Progress' },
  ];

  /**
   * Handler for date range changes from the Calendar component
   * @param {Object} range - Object containing startDate, endDate, and timeZone
   */
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Time Zone Calendar</h1>
      </header>
      <main>
        <Calendar onDateRangeChange={handleDateRangeChange} />
        <Table data={tableData} />
      </main>
    </div>
  );
}

export default App; 