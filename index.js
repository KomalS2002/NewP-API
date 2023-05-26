const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true,useUnifiedTopology:true}, ()=>{
    console.log("connected to mongo");
});


app.listen(8100, ()=>{
    console.log("Hello komal welcome on your first backend server on port 8100");
});

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
// app.get("/", (req,res)=>{
//     res.send("this is home");
// })

// app.get("/users", (req,res)=>{
//     res.send("this is users page");
// })

