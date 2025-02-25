import dotenv from "dotenv";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import coursesRouter from './routes/courses.js';

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

app.use('/courses', coursesRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));