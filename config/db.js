import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const URL = process.env.MONGODB_URL;
    const conn = await mongoose.connect(URL);
    // console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    // console.log(`MongoDB Error ${error}`.bgRed.white);
  }
};

export default connectDB;

