import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import os from "os" // Add os module to get hostname
import coursesRouter from "./routes/courses.js"
import { clearCache } from "./utils/cache.js"

dotenv.config()

const uri = process.env.ATLAS_URI || ""

const app = express()

// Add instance information middleware
app.use((req, res, next) => {
  // Add instance ID to response headers for debugging
  const instanceId = process.env.INSTANCE_ID || "0"
  const hostname = os.hostname()
  res.setHeader("X-Instance-Id", instanceId)
  res.setHeader("X-Hostname", hostname)
  next()
})

app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json())

async function connectDB() {
  try {
    await mongoose.connect(uri)
    console.log(`Instance ${process.env.INSTANCE_ID || "0"}: Connected to MongoDB`)

    const db = mongoose.connection.db
    const dbName = db.databaseName
    console.log(
      `Instance ${process.env.INSTANCE_ID || "0"}: Connected to MongoDB Atlas using Mongoose! Database Name: ${dbName}`,
    )

    const collections = await db.listCollections().toArray()
    console.log(
      `Instance ${process.env.INSTANCE_ID || "0"}: Database Info: ${dbName} has ${collections.length} collections`,
    )
  } catch (error) {
    console.error(`Instance ${process.env.INSTANCE_ID || "0"}: Could not connect to MongoDB:`, error)
    process.exit(1) // Exit process with failure
  }
}

await connectDB()

// Add instance info endpoint
app.get("/server-info", (req, res) => {
  res.json({
    instanceId: process.env.INSTANCE_ID || "0",
    hostname: os.hostname(),
    cpus: os.cpus().length,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
    },
    uptime: process.uptime(),
  })
})

// Add cache management endpoint (for admin use)
app.post("/admin/cache/clear", (req, res) => {
  const { pattern } = req.body
  clearCache(pattern)
  res.json({ message: "Cache cleared successfully" })
})

app.use("/courses", coursesRouter)

// Start the server
const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`Instance ${process.env.INSTANCE_ID || "0"}: Server running on port ${PORT}`))