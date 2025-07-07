import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/connectDb.js"

dotenv.config({
    path: './.env'
})



connectDB()
.then(() =>{
    app.listen(process.env.PORT,() => {
        console.log(`Server has Started at Port: ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log(console.log("MongoDB Connection Failed", err))
})