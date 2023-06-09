const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer");
const path = require("path")

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true,useUnifiedTopology:true}, ()=>{
    console.log("connected to mongo");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(8100, ()=>{
    console.log("Hello komal welcome on your first backend server on port 8100");
});

// middlewares
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
    cb(null,"public/images/");
    },
    filename: (req,file,cb) =>{
    cb(null,req.body.name);
    },

});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
    res.status(200).json("file uploaded successfully")
    }catch(err){
        console.log(err);
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
// app.get("/", (req,res)=>{
//     res.send("this is home");
// })

// app.get("/users", (req,res)=>{
//     res.send("this is users page");
// })

