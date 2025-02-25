import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Course from './models/Course.js';

dotenv.config();

const uri = process.env.ATLAS_URI || "";

const app = express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(`Connected to MongoDB Atlas using Mongoose! Database Name: ${dbName}`);

    const collections = await db.listCollections().toArray();
    console.log(`Database Info: ${dbName} has ${collections.length} collections`);

  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}

await connectDB();

// ---------------------
// API Endpoints
// ---------------------

// 1. Get a list of all the courses.
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get a single course by id.
app.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Create/add/insert a new course.
app.post('/courses', async (req, res) => {
  try {
    const { title, description, instructor, duration, category } = req.body;
    const course = new Course({ id, slug, title, description, hours, instructor, category, image });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update a course by id.
app.put('/courses/:id', async (req, res) => {
  try {
    const { id, slug, title, description, hours, instructor, category, image } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { id, slug, title, description, hours, instructor, category, image },
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete a course by id.
app.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));