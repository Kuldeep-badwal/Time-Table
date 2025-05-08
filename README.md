# Time Zone Calendar Application

A React application that provides a calendar interface with timezone support and data table visualization.

## Features

- Date range selection with calendar popup
- Timezone support with multiple timezone options
- Tooltips for special dates and events
- Data table with sorting and filtering capabilities
- Responsive design
- Modern UI with clean styling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd time-zone-table
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # React components
│   ├── Calendar/       # Calendar component and its subcomponents
│   └── Table/         # Table component
├── styles/            # CSS styles
│   └── components/    # Component-specific styles
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── constants/         # Application constants
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Usage

1. Select a timezone from the dropdown menu
2. Click on the start date input to open the calendar
3. Select a start date from the calendar
4. Click on the end date input to open the calendar
5. Select an end date (within 10 days of the start date)
6. Use the table below to view and filter the data

## Notes

- Date range is limited to 10 days
- Calendar selection is restricted to the past 90 days
- Some dates may be disabled or have special messages
- Table supports sorting by clicking column headers
- Table supports filtering using the search input

## Technologies Used

- React
- JavaScript (ES6+)
- CSS3
- Create React App
