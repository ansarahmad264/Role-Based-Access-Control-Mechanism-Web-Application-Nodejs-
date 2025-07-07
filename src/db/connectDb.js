import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const fullUri = `${process.env.MONGODB_URI}`;
        console.log("Connecting to:", fullUri);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log(`\n MongoDb Connection Successfull!! DB Host ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("Database Connection FAILED:" + error)
        process.exit(1)
    }
}

export default connectDB;