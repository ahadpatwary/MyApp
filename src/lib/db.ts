import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
        connection: null,
        promise: null 
    };
}

export async function connectToDb() {
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("❌ Missing MONGODB_URI in .env");

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
}
