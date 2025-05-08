import React from 'react';
import PropTypes from 'prop-types';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarPopup from './CalendarPopup';
import '../../styles/components/Calendar/styles.css';

/**
 * Calendar component for date range selection with timezone support
 * @param {Object} props - Component props
 * @param {Function} props.onDateRangeChange - Callback when date range changes
 */
const Calendar = ({ onDateRangeChange }) => {
  const {
    timeZone,
    setTimeZone,
    startDate,
    endDate,
    tooltipMessage,
    tooltipPosition,
    showTooltip,
    showStartCalendar,
    setShowStartCalendar,
    showEndCalendar,
    setShowEndCalendar,
    calendarRef,
    handleDateClick,
    handleCalendarHover,
    handleDateLeave,
    isDateDisabled,
    TIME_ZONES
  } = useCalendar(onDateRangeChange);

  return (
    <div className="calendar">
      {/* Timezone Selection */}
      <div className="timezone-selector">
        <label htmlFor="timezone">Time Zone:</label>
        <select
          id="timezone"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          {TIME_ZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Selection */}
      <div className="date-inputs">
        {/* Start Date Input */}
        <div className="date-input">
          <label htmlFor="startDate">Start Date:</label>
          <div className="date-input-container">
            <input
              type="text"
              id="startDate"
              value={startDate}
              readOnly
              onClick={() => setShowStartCalendar(!showStartCalendar)}
              placeholder="Select start date"
            />
            {showStartCalendar && (
              <CalendarPopup
                type="start"
                selectedDate={startDate}
                onDateClick={handleDateClick}
                onDateHover={handleCalendarHover}
                onDateLeave={handleDateLeave}
                isDateDisabled={isDateDisabled}
                calendarRef={calendarRef}
              />
            )}
          </div>
        </div>

        {/* End Date Input */}
        <div className="date-input">
          <label htmlFor="endDate">End Date:</label>
          <div className="date-input-container">
            <input
              type="text"
              id="endDate"
              value={endDate}
              readOnly
              onClick={() => setShowEndCalendar(!showEndCalendar)}
              placeholder="Select end date"
            />
            {showEndCalendar && (
              <CalendarPopup
                type="end"
                selectedDate={endDate}
                onDateClick={handleDateClick}
                onDateHover={handleCalendarHover}
                onDateLeave={handleDateLeave}
                isDateDisabled={isDateDisabled}
                calendarRef={calendarRef}
              />
            )}
          </div>
        </div>
      </div>

      {/* Selected Date Range Display */}
      <div className="date-display">
        {startDate && endDate && (
          <p>
            Selected Range: {startDate} to {endDate}
            <br />
            Time Zone: {timeZone}
          </p>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="tooltip"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 30
          }}
        >
          {tooltipMessage}
        </div>
      )}
    </div>
  );
};

Calendar.propTypes = {
  onDateRangeChange: PropTypes.func.isRequired
};

export default Calendar; 