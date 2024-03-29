const mongoose = require("mongoose");

// movie schema
const moviesSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    moviename:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    publishyear:{
        type:Number,
        required:true
    },
},{timestamps:true})
//timestamps ye btayega ki koi movies kab create hui

// model
const moviesDB = new mongoose.model("movies", moviesSchema);
module.exports = moviesDB;