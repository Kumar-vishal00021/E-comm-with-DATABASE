import express from "express";
import baseRoutes from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import connectionToDb from "./src/routes/Db.js";
const app=express();
const PORT=3000;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/",baseRoutes);
app.listen(PORT,()=>{
    console.log(`server is listing at http://localhost:${PORT}/`);
    connectionToDb();
})