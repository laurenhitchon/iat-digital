import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("courses");

const collections = await db.listCollections().toArray();
console.log("Collections:");
console.log(collections.length);
collections.forEach(collection => {
  console.log(collection.name);
});

const databasesList = await client.db().admin().listDatabases();
console.log("Databases:");
console.log(databasesList);

export default db;