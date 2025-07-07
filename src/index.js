import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})



app.listen(process.env.PORT || 4000, () => {
    console.log(`Server has Started at Port: ${process.env.PORT}`);
})