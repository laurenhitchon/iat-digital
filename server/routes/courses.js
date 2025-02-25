// routes/courses.js
import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Get a list of all courses.
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single course by id.
router.get('/:id', async (req, res) => {
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

// Create/add a new course.
router.post('/', async (req, res) => {
  try {
    const { id, slug, title, description, hours, instructor, category, image } = req.body;
    const course = new Course({ id, slug, title, description, hours, instructor, category, image });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a course by id.
router.put('/:id', async (req, res) => {
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

// Delete a course by id.
router.delete('/:id', async (req, res) => {
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

export default router;