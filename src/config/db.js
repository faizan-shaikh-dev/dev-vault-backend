import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection success");
  } catch (error) {
    console.error("Database connection Failed");
    process.exit(1);
  }
};

export default connectDB;
