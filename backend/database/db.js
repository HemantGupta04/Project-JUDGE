import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async () => {
    const MONGO_URI = "mongodb+srv://heemantgupta2014:heemantgupta2014@cluster0.959nhqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB Connection established");
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
    }
};

export { DBConnection };
