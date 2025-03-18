// routes/courses.js
import express from "express"
import Course from "../models/Course.js"
import { cacheMiddleware, clearCache } from "../utils/cache.js"

const router = express.Router()

// Get a list of all courses with caching (TTL: 5 minutes)
router.get("/", cacheMiddleware(300), async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get a single course by id with caching (TTL: 10 minutes)
router.get("/:id", cacheMiddleware(600), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }
    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create/add a new course.
router.post("/", async (req, res) => {
  try {
    const { id, slug, title, description, hours, instructor, category, image } = req.body
    const course = new Course({ id, slug, title, description, hours, instructor, category, image })
    await course.save()

    // Clear courses cache when a new course is added
    clearCache("/courses")

    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update a course by id.
router.put("/:id", async (req, res) => {
  try {
    const { id, slug, title, description, hours, instructor, category, image } = req.body
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { id, slug, title, description, hours, instructor, category, image },
      { new: true, runValidators: true },
    )
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // Clear specific course cache and courses list cache
    clearCache(`/courses/${req.params.id}`)
    clearCache("/courses")

    res.json(course)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a course by id.
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // Clear specific course cache and courses list cache
    clearCache(`/courses/${req.params.id}`)
    clearCache("/courses")

    res.json({ message: "Course deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router