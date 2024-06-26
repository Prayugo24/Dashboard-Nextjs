import mongoose from "mongoose";


const connection: { isConnected?: number } = {};


export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const MONGO_URL = process.env.MONGOURL || 'mongodb://localhost:27017/dashboard';

    const db = await mongoose.connect(MONGO_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected:', MONGO_URL);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Error connecting to MongoDB');
  }
};
