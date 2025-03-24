import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI as string;
let dbName = process.env.MONGODB_DB as string;

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri as string, {
    // Your connection options here
  });

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
