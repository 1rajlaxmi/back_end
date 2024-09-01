import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB")
    }
    catch (e) {
        console.log("Error connecting to mongoDB",e.message)
    }
};

export default connectMongodb;
