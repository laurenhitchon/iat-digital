// routes/courses.js
import express from "express"
import Course from "../models/course.js"
import { cacheMiddleware, clearCache } from "../utils/cache.js"

const router = express.Router()

// Get a list of all courses with caching (TTL: 5 minutes)
router.get("/", cacheMiddleware(300), async (req, res) => {
  try {
    const courses = await Course.find().lean() // Convert to plain JS objects
    const formattedCourses = courses.map(course => ({
      ...course,
      _id: course._id.toString() // Convert _id to string
    }))
    res.json(formattedCourses)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get a single course by id with caching (TTL: 10 minutes)
router.get("/:id", cacheMiddleware(600), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean()
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }
    res.json({ ...course, _id: course._id.toString() }) // Ensure _id is a string
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

    clearCache("/courses")

    res.status(201).json({ ...course.toObject(), _id: course._id.toString() }) // Convert _id to string
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
      { new: true, runValidators: true }
    ).lean()

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    clearCache(`/courses/${req.params.id}`)
    clearCache("/courses")

    res.json({ ...course, _id: course._id.toString() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a course by id.
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id).lean()
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    clearCache(`/courses/${req.params.id}`)
    clearCache("/courses")

    res.json({ message: "Course deleted successfully", deletedCourseId: course._id.toString() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router