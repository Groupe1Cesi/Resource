import mongoose, { Mongoose, mongo } from "mongoose";

export async function initiMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    return await mongoose.connect(process.env.MONGO_URI);
}