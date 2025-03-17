# IAT Digital Client

A React + TypeScript + Vite frontend application for the IAT Digital platform.

## Overview

IAT Digital is an educational platform focused on web development and programming courses. The platform offers a variety of courses designed for different skill levels, from beginners to advanced developers.

Our course catalog includes:

- **Web Development Fundamentals**: An introductory course covering HTML, CSS, and JavaScript basics - perfect for beginners starting their coding journey.

- **React Masterclass**: An intermediate course focused on React.js, teaching state management, hooks, and modern React patterns through hands-on projects.

- **Full Stack Development**: A comprehensive course that bridges frontend and backend technologies, covering databases and deployment strategies to help students become complete full-stack developers.

Each course is carefully structured with detailed curriculum, experienced instructors, and practical exercises to ensure an effective learning experience.

The platform features an intuitive interface for browsing courses, accessing learning materials, and tracking progress throughout your educational journey.

## Technologies Used

- React
- TypeScript
- Vite (build tool)
- ESLint (code linting)

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/laurenhitchon/iat-digital.git
   cd iat-digital/client
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn
   ```

## Configuration

The application may require configuration to connect to the backend API. Check for any environment variables in the codebase that need to be set.

You might need to create a `.env` file in the client directory with variables such as:

```
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
client/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main App component
│   └── main.tsx      # Entry point
├── .gitignore        # Git ignore file
├── components.json   # Component configuration
├── eslint.config.js  # ESLint configuration
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
└── README.md         # Project documentation
```

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint` or `yarn lint`

Runs ESLint to check for code quality issues.

### `npm run preview` or `yarn preview`

Locally preview the production build.

## Connecting to the Backend

This client application is designed to work with the IAT Digital backend server. Make sure the backend server is running and properly configured to allow requests from this client.

## Features

- View courses
- Add new courses
- Edit existing courses
- Delete courses

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
