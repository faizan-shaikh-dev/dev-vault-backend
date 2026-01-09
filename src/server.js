import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, (req, res)=>{
    console.log(`http://localhost:${PORT}`);
    
});