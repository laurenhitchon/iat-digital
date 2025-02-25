// models/Course.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  hours: Number,
  instructor: String, // e.g., duration in hours
  category: String,
  image: String,
});

export default model('Course', CourseSchema);
