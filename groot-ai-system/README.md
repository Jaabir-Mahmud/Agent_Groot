# Groot Multi-Agent AI System - Frontend

A modern, responsive React application that provides an intuitive interface for interacting with the Groot Multi-Agent AI System. Built with React, Tailwind CSS, and modern UI components.

## Features

- **Beautiful Landing Page**: Professional landing page showcasing the multi-agent system
- **Interactive Dashboard**: Real-time monitoring of agent activities and task progress
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Real-time Updates**: Live monitoring of agent status and activity logs

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── LandingPage.jsx  # Main landing page
│   └── Dashboard.jsx    # Multi-agent dashboard
├── assets/              # Images and static assets
├── App.jsx              # Main application component
├── App.css              # Global styles and Tailwind config
└── main.jsx             # Application entry point
```

## Installation

1. **Clone the repository** (if not already done)
2. **Navigate to the frontend directory**:
   ```bash
   cd groot-ai-system
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

## Development

### Start Development Server
```bash
pnpm run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
pnpm run build
# or
npm run build
```

Built files will be generated in the `dist/` directory.

### Preview Production Build
```bash
pnpm run preview
# or
npm run preview
```

## Features Overview

### Landing Page
- **Hero Section**: Compelling introduction to Groot
- **Features Showcase**: Detailed explanation of capabilities
- **How It Works**: Visual explanation of the multi-agent workflow
- **Use Cases**: Real-world applications across different domains
- **Technology Stack**: Overview of the underlying technologies

### Dashboard
- **Agent Management**: Real-time status of all AI agents
- **Task Submission**: Interface for submitting complex tasks
- **Activity Monitor**: Live feed of agent interactions
- **Results Display**: Formatted output from multi-agent collaboration
- **Task History**: Archive of completed tasks

## Component Architecture

### LandingPage Component
- Responsive design with mobile-first approach
- Smooth scroll animations using Framer Motion
- Interactive navigation with anchor links
- Call-to-action buttons that navigate to the dashboard

### Dashboard Component
- Real-time polling for agent status updates
- WebSocket-like communication with backend API
- Tabbed interface for different views (Workspace, Activity, History)
- Responsive layout that adapts to different screen sizes

## Styling

The application uses Tailwind CSS with a custom design system:

- **Color Palette**: Green-based theme reflecting the "Groot" branding
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: shadcn/ui components with custom styling

## API Integration

The frontend communicates with the Flask backend through RESTful API calls:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Submit a task
fetch(`${API_BASE_URL}/tasks`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ task: taskDescription })
});

// Get agent status
fetch(`${API_BASE_URL}/agents`);

// Monitor activity
fetch(`${API_BASE_URL}/activity`);
```

## Deployment

### Vercel Deployment
1. Build the project: `pnpm run build`
2. Deploy the `dist/` directory to Vercel
3. Configure environment variables if needed

### Full-Stack Deployment
For integrated deployment with the backend:
1. Build the frontend: `pnpm run build`
2. Copy built files to the Flask backend's static directory
3. Deploy the Flask application (which serves both API and frontend)

## Customization

### Adding New Components
1. Create components in the `src/components/` directory
2. Follow the existing naming conventions
3. Use Tailwind CSS for styling
4. Import and use shadcn/ui components as needed

### Modifying Styles
1. Update `src/App.css` for global styles
2. Use Tailwind utility classes for component-specific styling
3. Maintain the existing color scheme and design patterns

### Adding New Pages
1. Create new components in `src/components/`
2. Add routes in `src/App.jsx`
3. Update navigation as needed

## Performance Considerations

- **Code Splitting**: Vite automatically handles code splitting
- **Image Optimization**: Images are optimized during build
- **Bundle Size**: Monitored and optimized for fast loading
- **Lazy Loading**: Components are loaded as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When contributing to the frontend:
1. Follow the existing code style and patterns
2. Use TypeScript-style JSDoc comments for documentation
3. Test on multiple screen sizes and browsers
4. Ensure accessibility standards are met

## License

This project is part of the Groot Multi-Agent AI System and follows the same licensing terms.

