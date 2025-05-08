/**
 * Time zone options for the calendar component
 * Each timezone includes its GMT offset for better user understanding
 */
export const TIME_ZONES = [
  { value: 'UTC', label: 'UTC (GMT+0)' },
  { value: 'Asia/Calcutta', label: 'Asia/Calcutta (GMT+5:30)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (GMT+4)' },
  { value: 'Europe/Moscow', label: 'Europe/Moscow (GMT+3)' },
  { value: 'America/New_York', label: 'America/New_York (GMT-4)' },
];

/**
 * Predefined messages and disabled dates for the calendar
 * Used to show tooltips and disable specific dates
 */
export const DATE_MESSAGES = {
  '2024-03-15': { message: 'Holiday - Office Closed', disabled: true },
  '2024-03-20': { message: 'Maintenance Day', disabled: false },
  '2024-03-25': { message: 'Special Event', disabled: false },
};

/**
 * Maximum number of days allowed in date range selection
 */
export const MAX_DATE_RANGE = 10;

/**
 * Number of past days to restrict calendar selection
 */
export const PAST_DAYS_LIMIT = 90;

/**
 * Weekday labels for the calendar grid
 */
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Tooltip display duration in milliseconds
 */
export const TOOLTIP_DURATION = 3000; 