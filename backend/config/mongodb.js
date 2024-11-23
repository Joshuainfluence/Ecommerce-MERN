import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', ()=>{
        console.log('Db connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
}

export default connectDB;