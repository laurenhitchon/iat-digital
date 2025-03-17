# IAT Digital - Client

This repository contains the frontend (client) of the IAT Digital project, built using React and Vite. Below is an overview of the project structure and what to expect when cloning and running the project.

## Project Structure

```
iat-digital/
├── .DS_Store
├── .gitattributes
├── .gitignore
├── README.md
├── client/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── README.md
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── server/
│   ├── db/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── .DS_Store
│   ├── .env
│   ├── .gitattributes
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── server/
```

## Overview

IAT Digital is a full-stack web application built with modern JavaScript/TypeScript technologies. The project follows a client-server architecture with a clear separation between frontend and backend codebases.

### Client (Frontend)

- Built with **React**, **TypeScript**, and **Vite**
- Modern UI development environment with fast refresh
- TypeScript configuration for type safety
- ESLint for code quality

### Server (Backend)

- **Node.js** backend server
- RESTful API routes
- Database models and configuration
- Environment variable support

## Technology Stack

### Frontend

- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and development server
- **ESLint**: Code linting

### Backend

- **Node.js**: JavaScript runtime
- **Express.js** (likely): Web framework
- Database (specific DB technology not identified)
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14.x or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   \```bash
   git clone <https://github.com/laurenhitchon/iat-digital.git>
   cd iat-digital
   \```

2. Set up the client
   \```bash
   cd client
   npm install
   \```

3. Set up the server
   \```bash
   cd ../server
   npm install
   \```

4. Configure environment variables
   - Create or modify the `.env` file in the server directory with necessary credentials

### Running the Application

#### Development Mode

1. Start the server
   \```bash

   ### In the server directory

   npm run dev
   \```

2. Start the client
   \```bash

   ### In the client directory

   npm run dev
   \```

3. Access the application
   - Frontend typically runs on: <http://localhost:5173> (Vite default)
   - Backend typically runs on: <http://localhost:3000> or similar

## Development

### Client Development

The client is built with React and TypeScript using Vite as the build tool. This provides:

- Fast hot module replacement for quick development
- TypeScript integration for type safety
- Modern JavaScript features

### Server Development

The server follows a modular structure:

- `db/`: Database connection and configuration
- `models/`: Data models and schemas
- `routes/`: API endpoint definitions
- `server.js`: Main application entry point

## Deployment

To deploy the application:

1. Build the client
   \```bash
   cd client
   npm run build
   \```

2. Configure production environment variables for the server

3. Start the server in production mode
   \```bash
   cd ../server
   npm start
   \```
