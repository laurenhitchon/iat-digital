// models/Course.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const LessonSchema = new mongoose.Schema({
  type: String,
});

const ModuleSchema = new mongoose.Schema({
  title: String,
  lessons: [LessonSchema],
});

const CourseSchema = new Schema({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  hours: Number,
  instructor: String, // e.g., duration in hours
  category: String,
  image: String,
  modules: [ModuleSchema],
});

export default model('Course', CourseSchema);
