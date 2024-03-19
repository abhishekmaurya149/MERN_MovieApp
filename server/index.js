require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
require("./db/conn");
const PORT = 4009;

app.use(cors());

app.use(express.json());

app.get('/', (req,res)=>{
    res.status(200).json("server start")
})

// user routes
const userAuthRouter = require("./routes/user/userAuthroutes");
app.use("/userauth/api",userAuthRouter)

// movie routes
const moviesroutes = require("./routes/movie/movieroutes");
app.use("/movies/api", moviesroutes);
// Listen app
app.listen(PORT,()=>{
    console.log(`server start at port no ${PORT}`);
})