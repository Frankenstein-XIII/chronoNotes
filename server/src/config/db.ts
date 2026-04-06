import mongoose  from "mongoose";


export const connectDB = async() =>{
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/chrononote');
    if (!conn) return console.error("❎ Error Connection to MongoDB.");
    return console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
}