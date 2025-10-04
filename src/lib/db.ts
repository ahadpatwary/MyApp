import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI) throw new Error ("plese declare the MONGODB_URI")

const cached = global.mongoose

if(!cached) {
    global.mongoose = {
        connection : null,
        promise : null
    }
}

export async function connectToDb () {

    if(cached.connection)  return cached.connection

    if(!cached.promise) {
        mongoose
            .connect(MONGODB_URI)
            .then(()=> mongoose.connection)
    }

    try{
        cached.connection = await cached.promise
    }catch(err){
        cached.promise = null
        throw err
    }
    
    return cached.connection
}