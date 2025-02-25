import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will get a list of all the courses.
router.get("/", async (req, res) => {
  let collection = await db.collection("courses");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will get a single course by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("courses");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      title: req.body.title,
      description: req.body.description,
      instructor: req.body.instructor,
      duration: req.body.duration,
      category: req.body.category,
    };
    let collection = await db.collection("courses");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding course");
  }
});

// This section will update a course by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        duration: req.body.duration,
        category: req.body.category,
      },
    };

    let collection = await db.collection("courses");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating course");
  }
});

// This section will delete a course by id.
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("courses");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting course");
  }
});

export default router;