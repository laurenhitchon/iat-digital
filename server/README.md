# IAT Digital Courses API Server

## Overview

This is the backend API server for the IAT Digital Courses platform. It provides course data to the frontend application and implements various scalability features including:

- In-memory caching using node-cache
- Process-level load balancing using PM2
- HTTP load balancing using Nginx

The server is built with Express.js and MongoDB, providing a RESTful API for course management.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB Atlas account** or a local MongoDB instance
- **Nginx** (for production load balancing)
- **PM2** (can be installed globally or as a project dependency)

## Environment Variables

Create a `.env` file in the server root directory with the following variables:

\`\`\`
ATLAS_URI=mongodb+srv://admin:hwze3899@courses.aeyzp.mongodb.net/iatdigital?retryWrites=true&w=majority&appName=courses
PORT=5050
\`\`\`

### Variable Descriptions

- **ATLAS_URI**: Your MongoDB connection string for connecting to the MongoDB Atlas database.
- **PORT**: The port on which the server will run. Defaults to 5050 if not specified.

### Notes

- The server will not start without a valid `ATLAS_URI`.
- For local development, you can create a `.env` file in the server directory.
- For production, ensure these environment variables are properly set in your deployment environment.

## Database Setup

The application uses MongoDB as its database, specifically MongoDB Atlas (a cloud-hosted MongoDB service). This section explains how to set up and configure the database.

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account if you don't have one.
   - Once logged in, create a new project (e.g., "IAT Digital").

2. **Create a Cluster**:
   - Click "Build a Cluster" and select the free tier option.
   - Choose your preferred cloud provider and region.
   - Click "Create Cluster" (this may take a few minutes to provision).

3. **Set Up Database Access**:
   - In the left sidebar, go to "Database Access" under Security.
   - Click "Add New Database User".
   - Create a user with a username and password (e.g., username: "admin", password: "hwze3899").
   - Set privileges to "Read and Write to Any Database" for simplicity.
   - Click "Add User".

4. **Configure Network Access**:
   - In the left sidebar, go to "Network Access" under Security.
   - Click "Add IP Address".
   - For development, you can add your current IP or use "0.0.0.0/0" to allow access from anywhere (not recommended for production).
   - Click "Confirm".

5. **Get Connection String**:
   - Once your cluster is ready, click "Connect".
   - Select "Connect your application".
   - Copy the connection string.
   - Replace `<password>` with your database user's password.
   - Add the database name to the connection string (e.g., "iatdigital").

6. **Update Environment Variables**:
   - Add the connection string to your `.env` file as `ATLAS_URI`.

### Database Structure

The application uses a single database with the following collections:

1. **courses**: Stores information about courses.

#### Courses Collection Schema

\`\`\`javascript
{
  id: Number,           // Unique identifier for the course
  slug: String,         // URL-friendly name
  title: String,        // Course title
  description: String,  // Course description
  hours: Number,        // Duration in hours
  instructor: String,   // Name of the instructor
  category: String,     // Course category
  image: String         // Path to course image
}
\`\`\`

### Initial Data Setup

To populate the database with initial data, you can use the following steps:

1. Create a file called `seed-data.js` in the project root:

\`\`\`javascript
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

const courses = [
  {
    id: 1,
    slug: "react-fundamentals",
    title: "React Fundamentals",
    description: "Learn the fundamentals of React",
    hours: 10,
    instructor: "John Doe",
    category: "Web Development",
    image: "/images/react.jpg"
  },
  {
    id: 2,
    slug: "node-js-basics",
    title: "Node.js Basics",
    description: "Introduction to Node.js development",
    hours: 8,
    instructor: "Jane Smith",
    category: "Backend Development",
    image: "/images/nodejs.jpg"
  },
  // Add more courses as needed
];

async function seedDatabase() {
  try {
    await client.connect();
    const database = client.db('iatdigital');
    const coursesCollection = database.collection('courses');
    
    // Clear existing data
    await coursesCollection.deleteMany({});
    
    // Insert new data
    const result = await coursesCollection.insertMany(courses);
    console.log(`${result.insertedCount} courses inserted`);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);
\`\`\`

2. Run the script:
\`\`\`bash
node seed-data.js
\`\`\`

### Database Connection

The application connects to MongoDB using Mongoose, a MongoDB object modeling tool. The connection is established in `config/db.js`:

\`\`\`javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
\`\`\`

### Troubleshooting Database Issues

If you encounter issues with the database connection:

1. **Connection String Issues**:
   - Ensure the connection string in your `.env` file is correct.
   - Check that you've replaced `<password>` with your actual password.
   - Verify that the database name is included in the connection string.

2. **Network Issues**:
   - Check that your IP address is whitelisted in MongoDB Atlas Network Access.
   - Ensure your network allows outbound connections to MongoDB Atlas.

3. **Authentication Issues**:
   - Verify that the username and password in the connection string match your MongoDB Atlas user.
   - Check that your database user has the correct permissions.

4. **Database Errors**:
   - Check the server logs for specific error messages.
   - Ensure the database and collections exist.

5. **MongoDB Atlas Status**:
   - Check the [MongoDB Atlas Status Page](https://status.mongodb.com/) for any service disruptions.

## Project Structure

The server project is organized as follows:

\`\`\`
server/
├── config/                  # Configuration files
│   └── db.js                # MongoDB connection setup
├── controllers/             # Request handlers
│   └── courseController.js  # Course-related operations
├── middleware/              # Express middleware
│   └── cache.js             # Caching middleware
├── models/                  # MongoDB models
│   └── Course.js            # Course data model
├── routes/                  # API routes
│   ├── courses.js           # Course endpoints
│   └── admin.js             # Admin endpoints
├── utils/                   # Utility functions
│   └── cache-manager.js     # Cache management utilities
├── .env                     # Environment variables (not in repo)
├── ecosystem.config.js      # PM2 configuration
├── nginx.conf               # Nginx configuration
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── server.js                # Main application entry point
\`\`\`

### Key Components

- **server.js**: The main entry point that sets up the Express application, connects to MongoDB, and starts the server.
- **routes/**: Contains route definitions that map API endpoints to controller functions.
- **controllers/**: Contains the business logic for handling requests.
- **models/**: Defines MongoDB schemas and models for data storage.
- **middleware/**: Contains Express middleware for request processing, including the caching middleware.
- **config/**: Contains configuration files, including database connection setup.
- **utils/**: Contains utility functions and helpers.
- **ecosystem.config.js**: PM2 configuration for running multiple instances of the application.
- **nginx.conf**: Nginx configuration for load balancing across PM2 instances.

### Application Flow

1. Client sends a request to the server (via Nginx in production)
2. Nginx forwards the request to one of the PM2 instances
3. Express middleware processes the request (including cache checks)
4. The appropriate route handler is called
5. The controller executes business logic, interacting with the database if needed
6. The response is sent back to the client, potentially cached for future requests

## Running the Application

Follow these step-by-step instructions to run the application in different environments.

### Development Mode

For local development with automatic server restarts:

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a `.env` file with the required environment variables (see Environment Variables section).

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   
   This will start the server using nodemon, which automatically restarts when files change.

4. The server will be available at http://localhost:5050 (or the port specified in your .env file).

### Production Mode with PM2

For running multiple instances with PM2:

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Install PM2 globally if not already installed:
   \`\`\`bash
   npm install -g pm2
   \`\`\`

3. Create a `.env` file with the required environment variables.

4. Start the server with PM2:
   \`\`\`bash
   npm run pm2:start
   \`\`\`
   
   This will start 4 instances of the application on ports 3001-3004 as defined in the `ecosystem.config.js` file.

5. Verify the instances are running:
   \`\`\`bash
   pm2 list
   \`\`\`

6. Monitor the instances:
   \`\`\`bash
   pm2 monit
   \`\`\`

7. To stop all instances:
   \`\`\`bash
   npm run pm2:stop
   \`\`\`

### Production Mode with PM2 and Nginx

For a complete production setup with load balancing:

1. Follow steps 1-5 from the "Production Mode with PM2" section.

2. Install Nginx if not already installed:
   \`\`\`bash
   # For Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   
   # For CentOS/RHEL
   sudo yum install epel-release
   sudo yum install nginx
   
   # For macOS
   brew install nginx
   \`\`\`

3. Copy the Nginx configuration:
   \`\`\`bash
   sudo cp nginx.conf /etc/nginx/conf.d/your-domain.conf
   \`\`\`

4. Test the Nginx configuration:
   \`\`\`bash
   sudo nginx -t
   \`\`\`

5. Restart Nginx to apply the configuration:
   \`\`\`bash
   sudo systemctl restart nginx
   # or on macOS
   brew services restart nginx
   \`\`\`

6. For local testing, add the following to your hosts file (replace "your-domain.com" with your actual domain or a local testing domain):
   \`\`\`
   127.0.0.1 your-domain.com www.your-domain.com
   \`\`\`

7. Access the application at http://your-domain.com or simply use http://localhost:80

## API Endpoints

The server provides the following RESTful API endpoints:

### Course Endpoints

| Method | Endpoint | Description | Cache TTL |
|--------|----------|-------------|-----------|
| GET | `/courses` | Get all courses | 5 minutes |
| GET | `/courses/:id` | Get a specific course by ID | 10 minutes |
| POST | `/courses` | Create a new course | N/A |
| PUT | `/courses/:id` | Update a course | N/A |
| DELETE | `/courses/:id` | Delete a course | N/A |

### System Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/server-info` | Get information about the server instance |
| POST | `/admin/cache/clear` | Clear the cache (accepts optional pattern in request body) |

### Detailed Endpoint Documentation

#### GET /courses

Retrieves a list of all courses.

**Response Format:**
\`\`\`json
[
  {
    "id": 1,
    "slug": "react-fundamentals",
    "title": "React Fundamentals",
    "description": "Learn the fundamentals of React",
    "hours": 10,
    "instructor": "John Doe",
    "category": "Web Development",
    "image": "/images/react.jpg"
  },
  // More courses...
]
\`\`\`

**Example:**
\`\`\`bash
curl http://localhost:5050/courses
\`\`\`

#### GET /courses/:id

Retrieves a specific course by ID.

**Parameters:**
- `id`: The ID of the course to retrieve

**Response Format:**
\`\`\`json
{
  "id": 1,
  "slug": "react-fundamentals",
  "title": "React Fundamentals",
  "description": "Learn the fundamentals of React",
  "hours": 10,
  "instructor": "John Doe",
  "category": "Web Development",
  "image": "/images/react.jpg"
}
\`\`\`

**Example:**
\`\`\`bash
curl http://localhost:5050/courses/1
\`\`\`

#### POST /courses

Creates a new course.

**Request Body:**
\`\`\`json
{
  "id": 11,
  "slug": "new-course",
  "title": "New Course Title",
  "description": "Course description",
  "hours": 15,
  "instructor": "Instructor Name",
  "category": "Category",
  "image": "/images/course.jpg"
}
\`\`\`

**Response Format:**
\`\`\`json
{
  "id": 11,
  "slug": "new-course",
  "title": "New Course Title",
  "description": "Course description",
  "hours": 15,
  "instructor": "Instructor Name",
  "category": "Category",
  "image": "/images/course.jpg"
}
\`\`\`

**Example:**
\`\`\`bash
curl -X POST http://localhost:5050/courses \
  -H "Content-Type: application/json" \
  -d '{
    "id": 11,
    "slug": "new-course",
    "title": "New Course Title",
    "description": "Course description",
    "hours": 15,
    "instructor": "Instructor Name",
    "category": "Category",
    "image": "/images/course.jpg"
  }'
\`\`\`

#### PUT /courses/:id

Updates an existing course.

**Parameters:**
- `id`: The ID of the course to update

**Request Body:**
\`\`\`json
{
  "slug": "updated-course",
  "title": "Updated Course Title",
  "description": "Updated description",
  "hours": 20,
  "instructor": "Instructor Name",
  "category": "Category",
  "image": "/images/course.jpg"
}
\`\`\`

**Response Format:**
\`\`\`json
{
  "id": 11,
  "slug": "updated-course",
  "title": "Updated Course Title",
  "description": "Updated description",
  "hours": 20,
  "instructor": "Instructor Name",
  "category": "Category",
  "image": "/images/course.jpg"
}
\`\`\`

**Example:**
\`\`\`bash
curl -X PUT http://localhost:5050/courses/11 \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "updated-course",
    "title": "Updated Course Title",
    "description": "Updated description",
    "hours": 20,
    "instructor": "Instructor Name",
    "category": "Category",
    "image": "/images/course.jpg"
  }'
\`\`\`

#### DELETE /courses/:id

Deletes a course.

**Parameters:**
- `id`: The ID of the course to delete

**Response Format:**
\`\`\`json
{
  "message": "Course deleted successfully"
}
\`\`\`

**Example:**
\`\`\`bash
curl -X DELETE http://localhost:5050/courses/11
\`\`\`

#### GET /server-info

Retrieves information about the server instance.

**Response Format:**
\`\`\`json
{
  "instanceId": "2",
  "hostname": "server-hostname",
  "cpus": 8,
  "memory": {
    "total": 16777216000,
    "free": 8388608000
  },
  "uptime": 3600
}
\`\`\`

**Example:**
\`\`\`bash
curl http://localhost:5050/server-info
\`\`\`

#### POST /admin/cache/clear

Clears the cache. Optionally accepts a pattern to clear specific cache entries.

**Request Body (optional):**
\`\`\`json
{
  "pattern": "/courses"
}
\`\`\`

**Response Format:**
\`\`\`json
{
  "message": "Cache cleared successfully",
  "cleared": 5
}
\`\`\`

**Example:**
\`\`\`bash
# Clear all cache
curl -X POST http://localhost:5050/admin/cache/clear

# Clear specific cache entries
curl -X POST http://localhost:5050/admin/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"pattern":"/courses"}'
\`\`\`
