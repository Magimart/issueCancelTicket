import mongoose from 'mongoose';
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

// const MONGODB_URI = process.env.DATABASE_CLOUD!

if (!process.env.DATABASE_CLOUD) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {

  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(`${process.env.DATABASE_CLOUD}`, opts).then((mongoose) => {
        console.log("db successfully connected")
      return mongoose;
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default dbConnect











