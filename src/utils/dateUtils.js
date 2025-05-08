/**
 * Converts a Date object to YYYY-MM-DD format
 * @param {Date} date - The date to convert
 * @returns {string} Date in YYYY-MM-DD format
 */
export const formatDateToYYYYMMDD = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Calculates the difference in days between two dates
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @returns {number} Number of days between dates
 */
export const calculateDaysDifference = (startDate, endDate) => {
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
};

/**
 * Gets the minimum selectable date (PAST_DAYS_LIMIT days ago)
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getMinSelectableDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 90);
  return formatDateToYYYYMMDD(date);
};

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayDate = () => {
  return formatDateToYYYYMMDD(new Date());
};

/**
 * Formats a date according to the specified timezone
 * @param {Date} date - The date to format
 * @param {string} timezone - The timezone to use
 * @returns {string} Formatted date string
 */
export const formatDateWithTimezone = (date, timezone) => {
  return new Date(date).toLocaleString('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
}; 