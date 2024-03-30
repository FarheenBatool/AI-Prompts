import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectMongoDB = async()=>{
    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
      }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          isConnected = true;  
        console.log("Connected to DB");
    } catch (error) {
        console.log('Error connecting to DB',error);
        
    }
}