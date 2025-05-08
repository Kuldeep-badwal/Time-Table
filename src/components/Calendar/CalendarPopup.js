import React from 'react';
import PropTypes from 'prop-types';
import { WEEKDAYS } from '../../constants/calendar';
import { formatDateToYYYYMMDD } from '../../utils/dateUtils';

/**
 * CalendarPopup component for displaying the date selection calendar
 * @param {Object} props - Component props
 * @param {string} props.type - Type of calendar ('start' or 'end')
 * @param {string} props.selectedDate - Currently selected date
 * @param {Function} props.onDateClick - Handler for date selection
 * @param {Function} props.onDateHover - Handler for date hover
 * @param {Function} props.onDateLeave - Handler for date leave
 * @param {Function} props.isDateDisabled - Function to check if date is disabled
 * @param {Object} props.calendarRef - Ref for the calendar container
 */
const CalendarPopup = ({
  type,
  selectedDate,
  onDateClick,
  onDateHover,
  onDateLeave,
  isDateDisabled,
  calendarRef
}) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Generate empty cells for days before the first day of the month
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`empty-${i}`} className="calendar-day empty" />
  ));
  
  // Generate cells for each day of the month
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, month, day);
    const dateStr = formatDateToYYYYMMDD(date);
    const isDisabled = isDateDisabled(dateStr);
    const isSelected = dateStr === selectedDate;
    
    return (
      <div
        key={day}
        className={`calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => onDateClick(date, type)}
        onMouseEnter={(e) => onDateHover(e, date, type)}
        onMouseLeave={onDateLeave}
      >
        {day}
      </div>
    );
  });
  
  return (
    <div className="calendar-popup" ref={calendarRef}>
      <div className="calendar-header">
        {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
        {emptyDays}
        {monthDays}
      </div>
    </div>
  );
};

CalendarPopup.propTypes = {
  type: PropTypes.oneOf(['start', 'end']).isRequired,
  selectedDate: PropTypes.string,
  onDateClick: PropTypes.func.isRequired,
  onDateHover: PropTypes.func.isRequired,
  onDateLeave: PropTypes.func.isRequired,
  isDateDisabled: PropTypes.func.isRequired,
  calendarRef: PropTypes.object
};

export default CalendarPopup; 