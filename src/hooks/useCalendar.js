import { useState, useRef, useEffect } from 'react';
import { TIME_ZONES, DATE_MESSAGES, MAX_DATE_RANGE, TOOLTIP_DURATION } from '../constants/calendar';
import { formatDateToYYYYMMDD, calculateDaysDifference } from '../utils/dateUtils';

/**
 * Custom hook for calendar functionality
 * @param {Function} onDateRangeChange - Callback function when date range changes
 * @returns {Object} Calendar state and handlers
 */
export const useCalendar = (onDateRangeChange) => {
  // State management
  const [timeZone, setTimeZone] = useState('UTC');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  
  // Refs
  const calendarRef = useRef(null);

  /**
   * Updates the date range and notifies parent component
   */
  const updateDateRange = (start, end, tz = timeZone) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const daysDiff = calculateDaysDifference(startDateObj, endDateObj);

      if (daysDiff > MAX_DATE_RANGE) {
        showRangeTooltip('Date range cannot exceed 10 days');
        return;
      }

      onDateRangeChange({
        startDate: startDateObj,
        endDate: endDateObj,
        timeZone: tz
      });
    }
  };

  /**
   * Shows a tooltip message for a specified duration
   */
  const showRangeTooltip = (message) => {
    setTooltipMessage(message);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), TOOLTIP_DURATION);
  };

  /**
   * Handles date selection from calendar
   */
  const handleDateClick = (date, type) => {
    const dateStr = formatDateToYYYYMMDD(date);
    
    if (isDateDisabled(dateStr)) {
      return;
    }

    if (type === 'start') {
      setStartDate(dateStr);
      setShowStartCalendar(false);
      updateDateRange(dateStr, endDate);
    } else {
      const startDateObj = new Date(startDate);
      const daysDiff = calculateDaysDifference(startDateObj, date);
      
      if (daysDiff > MAX_DATE_RANGE) {
        showRangeTooltip('Date range cannot exceed 10 days');
        return;
      }
      
      setEndDate(dateStr);
      setShowEndCalendar(false);
      updateDateRange(startDate, dateStr);
    }
  };

  /**
   * Handles hover events on calendar dates
   */
  const handleCalendarHover = (e, date, type) => {
    const dateStr = formatDateToYYYYMMDD(date);
    let message = '';
    
    if (DATE_MESSAGES[dateStr]?.message) {
      message = DATE_MESSAGES[dateStr].message;
    }
    
    if (isDateDisabled(dateStr)) {
      message = 'This date is disabled';
    }
    
    if (type === 'end' && startDate) {
      const startDateObj = new Date(startDate);
      const daysDiff = calculateDaysDifference(startDateObj, date);
      
      if (daysDiff > MAX_DATE_RANGE) {
        message = 'Date range cannot exceed 10 days';
      }
    }

    if (message) {
      const rect = e.target.getBoundingClientRect();
      setTooltipMessage(message);
      setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
      setShowTooltip(true);
    }
  };

  /**
   * Checks if a date is disabled
   */
  const isDateDisabled = (date) => {
    return DATE_MESSAGES[date]?.disabled || false;
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowStartCalendar(false);
        setShowEndCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
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
    handleDateLeave: () => setShowTooltip(false),
    isDateDisabled,
    TIME_ZONES
  };
}; 