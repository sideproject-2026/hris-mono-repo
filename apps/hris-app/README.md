# HRIS - Client Application

## Project Overview

This is a modern **Human Resource Information System (HRIS)** client application designed to streamline workforce management. The system focuses on providing a robust interface for **Attendance Management**, **Employee Scheduling**, **Policy Configuration**, and **Employee Administration**.

Built as a Single Page Application (SPA), it leverages the latest React ecosystem technologies to ensure performance, type safety, and a premium developer experience.

## Key Features

- **Attendance Management**: Comprehensive tools for tracking daily logs, managing attendance periods, and processing timesheets.
- **Work Scheduling**: Flexible scheduling system for managing employee shifts and work patterns.
- **Employee Directory**: Centralized management of employee profiles and data.
- **Attendance Policies**: Configurable rules for lateness, overtime, and leave management.
- **Calendar Views**: Visual scheduling and attendance tracking using interactive calendars.
- **Dashboards**: High-level insights and metrics for HR administrators.

## Technology Stack

The project is built on a cutting-edge stack emphasizing performance and type safety:

- **Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State Management**:
  - Server State: [TanStack Query](https://tanstack.com/query)
  - Client State: [Zustand](https://github.com/pmndrs/zustand) & [Jotai](https://jotai.org/)
  - URL State: [Nuqs](https://nuqs.47ng.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Date Handling**: `date-fns` & `@schedule-x/calendar`

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified in the console).

### Building for Production

To create a production build:

```bash
npm run build
```

### Linting & Formatting

- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Check**: `npm run check` (Runs prettier and eslint)
