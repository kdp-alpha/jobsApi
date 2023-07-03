import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb database`);
    } catch (error) {
        console.log(`Error Occured`,error)
    }
}

export default connectDB;