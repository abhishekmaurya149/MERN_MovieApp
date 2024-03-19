const moviesDB = require("../../model/movie/moviesModel");
const cloudinary = require("../../cloudinary/cloudinaryConfig");

// Create a new movie
exports.createMovie = async (req, res) => {
  // Extract file path, movie name, and publish year from request
  const file = req?.file ? req?.file?.path : ""; // Use optional chaining to handle undefined properties
  const { moviename, publishyear } = req.body;

  // Check if any required field is missing
  if (!file || !moviename || !publishyear) {
    // If any required field is missing, return a 400 status with an error message
    res.status(400).json({ error: "All fields are required" });
  } else {
    try {
      // Upload image to cloudinary
      const upload = await cloudinary?.uploader?.upload(file);
      
      // Check if movie with the provided name already exists
      const existingMovie = await moviesDB.findOne({ moviename: moviename });

      if (existingMovie) {
        // If a movie with the same name already exists, return a 400 status with an error message
        res.status(400).json({ error: "Movie already exists" });
      } else {
        // Create a new movie document
        const movieData = new moviesDB({
          userid: req?.userMainId,
          moviename,
          image: upload?.secure_url,
          publishyear,
        });

        // Save the new movie document to the database
        await movieData.save();

        // Return success response if movie is successfully created
        res.status(200).json({ message: "Movie successfully created" });
      }
    } catch (error) {
      // Return error response if any error occurs during movie creation process
      res.status(400).json({ error: "Something went wrong" });
    }
  }
};
 

// //* getAllusermovie
exports.getAllusermovie = async (req, res) => {
  const page = req.query.page || 1;
  const serch = req.query.search || "";
  const sort = req.query.sort || "";
  const ITEM_PER_PAGE = 2;
};

// const query = {
//   moviename: { $regex: search, $options: "i" },
// };
// try {
//   const skip = (page - 1) * ITEM_PER_PAGE; //3-1=2*2=4

//   // all movie count
//   const allusermovieCount = await moviesDB.countDocuments(query);

//   const allusermoviesData = await moviesDB
//     .find(query)
//     .limit(ITEM_PER_PAGE)
//     .skip(skip)
//     .sort({ _id: sort == "new" ? -1 : 1 });

//   const pageCount = Math.ceil(allusermovieCount / ITEM_PER_PAGE); //5/2 = 2.5=3
// } catch (error) {
//   console.log(error);
// }
