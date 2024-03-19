const multer = require("multer");

//storage config
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename);
    }
});

//filter
const filefilter = (req,file,callback)=>{
    if(file.mimetype === "image/png" || file.mimetype ==="image/jpg" ||file.mimetype ==="image/jpeg"){
        callback(null,true)
    }else{
    //If file format is not supported
        callback(null,true)
        return callback(new Error ("Only png, jpg and jpeg formate allowed"));
    }
}

//// Multer configuration for movie uploads
const movieupload = multer({
    storage:storage,
    fileFiltr:filefilter // Corrected type here from "fileFiltr" to "fileFilter"
});

module.exports = movieupload;