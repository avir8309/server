const express=require("express");
const app=express();

app.use(express.json());
require('dotenv').config();
app.listen(3000,()=>{
    console.log("server started");
})
const user=require("./routes/user");
const post=require("./routes/functionRoutes");
app.use("/api/v1",user);
app.use("/api/v1",post);

const dbConnect=require("./config/db");
dbConnect();