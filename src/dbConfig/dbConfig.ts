import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('mongodb connected')
    });
    connection.on('error', (err)=>{
        console.log('Mongodb connection error'+ err)
        process.exit()
    })
  } catch (e: any) {
    console.log("Something went wrong connecting db:", e);
  }
};
