// const express = require("express");
// const router = new express.Router();
// const userauthenticate = require("../../middleware/userauthenticate");
// const movieupload = require("../../multerConfig/movieStorageconfig");
// const moviescontrollers =  require("../../controllers/moviescontrollers/moviecontrollers");


// // movies routes
// router.post("/create",[userauthenticate, movieupload.single("image")], moviescontrollers.createmovie);
// router.get("/getallmovie", moviescontrollers.getAllusermovie);
// router.patch("/update/:id", [userauthenticate, movieupload.single("image")],moviescontrollers.updatemovise);
// router.delete("/delete/:id", userauthenticate,moviescontrollers.deleteMovie);
// router.get("/details/:id",moviescontrollers.getSingleMove);


// module.exports = router;