import mongoose from 'mongoose';

const connectDB = async ()=>{
   
    try {

        const join = await mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI);
        
        console.log(`Database conneceted ${join.connection.host}`);
        
    } catch (error) {

        console.log('error',error);
    
    }
}



export default connectDB;