import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import formRoute from './route/formRoute.js';


dotenv.config();
connectDB()

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/form",formRoute);


const PORT =  process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Node is running http://localhost ${PORT}`)
    
})


//http://localhost:3000/api/form/











