# Personal Employee Attendance Tracker

A modern, responsive web application designed to help employees track their attendance, manage leave requests, and monitor work hours. Built with cutting-edge technologies for a seamless user experience.

## Features

- **Dashboard Overview**: Real-time clock widget, attendance calendar, and weekly charts
- **Leave Management**: Track leave balances, submit requests, and view approval status
- **Time Logging**: Record work hours with detailed time logs
- **Analytics & Reports**: Generate comprehensive reports on attendance patterns
- **Notifications & Reminders**: Stay updated with important alerts and reminders
- **Achievements & Streaks**: Gamify attendance with streak tracking and achievements
- **Settings**: Customize user preferences and account settings

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript for better development experience
- **React** - Component-based UI library
- **shadcn-ui** - Modern UI components built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework for styling

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd personal-employee-attendance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## Usage

1. **Authentication**: Log in with your credentials
2. **Dashboard**: View your attendance overview and quick actions
3. **Time Tracking**: Use the clock widget to log in/out times
4. **Leave Requests**: Submit and manage leave requests from the Leave page
5. **Reports**: Access detailed analytics and generate reports
6. **Settings**: Customize your profile and preferences

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── dashboard/      # Dashboard-specific components
│   └── layout/         # Layout components
├── pages/              # Application pages/routes
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Deployment

This application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag-and-drop deployment or Git integration
- **GitHub Pages**: Free hosting for static sites
- **AWS/GCP/Azure**: Cloud platform deployments

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

