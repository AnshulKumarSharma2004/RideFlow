require("dotenv").config();
const cors = require("cors")
const express=require("express");
const connectDB = require("./db/db");
const app = express();
const userRoutes = require("./routes/user.routes")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB();

app.get("/",(req,res)=>{
res.send("Hello from RideFlow")
})

app.use("/users",userRoutes)
module.exports=app;