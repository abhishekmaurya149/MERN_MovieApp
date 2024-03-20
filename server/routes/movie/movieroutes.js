const express = require("express");
const router = express.Router();
const userAuthenticate = require("../../middleware/userauthenticate");
const movieupload = require("../../multerConfig/movieStorageconfig");
const moviescontrollers =  require("../../controllers/moviescontrollers/moviecontrollers");


// movies routes
// router.post("/create", [userAuthenticate])
router.post("/create",[userAuthenticate, movieupload.single("image")], moviescontrollers.createMovie);
router.get("/getallmovie", moviescontrollers.getAllusermovie);
router.patch("/update/:id", [userAuthenticate, movieupload.single("image")],moviescontrollers.updateMovies);
router.delete("/delete/:id", userAuthenticate,moviescontrollers.deleteMovie);
// router.get("/details/:id",moviescontrollers.getSingleMove);


module.exports = router;