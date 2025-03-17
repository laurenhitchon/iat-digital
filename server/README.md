# IAT Digital

A Node.js backend server application that provides API endpoints for course management.

## Overview

This project is a RESTful API server built with Express and MongoDB that manages course data. It provides endpoints for retrieving, creating, updating, and deleting course information.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv (for environment variables)
- CORS (Cross-Origin Resource Sharing)

## Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB Atlas account or local MongoDB installation
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/laurenhitchon/iat-digital.git
   cd iat-digital
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   ATLAS_URI="mongodb+srv://admin:hwze3899@courses.aeyzp.mongodb.net/iatdigital?retryWrites=true&w=majority&appName=courses"
   PORT="5050"
   ```

## Configuration

The application uses environment variables for configuration. Make sure to set up your `.env` file with:

- `ATLAS_URI`: 'mongodb+srv://admin:hwze3899@courses.aeyzp.mongodb.net/iatdigital?retryWrites=true&w=majority&appName=courses'
- `PORT`: '5050'

## Project Structure

```
iat-digital/
├── client/             # Frontend code (if applicable)
├── server/             # Backend server code
│   ├── server.js       # Main server entry point
│   ├── routes/         # API route definitions
│   │   └── courses.js  # Course-related routes
│   ├── models/         # Mongoose data models
│   └── node_modules/   # Node.js dependencies
├── .env                # Environment variables (create this file)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Running the Application

Start the server:

```
npm start
```

For development with auto-restart:

```
npm run dev
```

## API Endpoints

### Courses

- `GET /routes/courses` - Get all courses
- `GET /routes/courses/:id` - Get a specific course by ID
- `POST /routes/courses` - Create a new course
- `PUT /routes/courses/:id` - Update a course
- `DELETE /routes/courses/:id` - Delete a course

## Database

The application connects to MongoDB using Mongoose. The connection is established when the server starts, and it will log the connection status and available collections.

## Error Handling

The server includes error handling for database connection failures. If the MongoDB connection fails, the process will exit with an error message.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
