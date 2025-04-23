# Employee Leave Request Dashboard

A simple dashboard application for managing employee leave requests. This application allows administrators to view and manage leave requests submitted by employees.

## Features

The dashboard displays the following information for each leave request:

1. Employee name
2. Leave type
3. Date range (from - to)
4. Status
5. Reason

Administrators can approve or reject leave requests directly from the dashboard interface.

## UI Components

This project utilizes the following UI5 components:

- Table: For displaying leave request data
- Button: For action triggers
- Select: For filtering options
- SegmentedButton: For toggling between different views

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

```bash
# Clone the repository
git clone https://github.com/ramiroguzmanc/leaves-request-dashboard.git

# Navigate to the project directory
cd leaves-request-dashboard

# Install dependencies
bun install
```

### Running the Application

To start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`.

To build the application for production:

```bash
bun run build
```

### Testing

To run the test suite:

```bash
bun run test
```

## Technology Stack

- React
- TypeScript
- Vite
- UI5 Web Components
- Bun
- Shadcn UI
- Tailwind CSS
- Vitest
- Axios