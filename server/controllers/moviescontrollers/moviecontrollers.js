// const moviesDB = require("../../model/movie/moviesModel");
// const cludinary = require("../../cloudinary/cloudinaryConfig");

// exports.createmovie = async (req, res) => {
//   const file = req?.file ? req.file?.path : "";
//   const { moviename, publishyear } = req.body;

//   if (!file || !moviename || !publishyear) {
//     res.status(400).json({ error: "all filed are require" });
//   } else {
//     try {
//       const upload = await cludinary?.uploader?.upload(file);
//       const existingmovie = await moviesDB.fineOne({ moviename: moviename });

//       if (existingmovie) {
//         res.status(400).json({ error: "already exist" });
//       } else {
//         const moviesData = new moviesDB({
//           userid: req?.userMainId,
//           moviename,
//           image: upload?.secure_url,
//           publishyear,
//         });

//         await moviesData.save();

//         res.status(200).json({ message: "movies sucessfully create" });
//       }
//     } catch (error) {
//       res.status(400).json({ error: EvalError });
//     }
//   }
// };

// //* getAllusermovie
// exports.getAllusermovie = async (req, res) => {
//   const page = req.query.page || 1;
//   const serch = req.query.search || "";
//   const sort = req.query.sort || "";
//   const ITEM_PER_PAGE = 2;
// };

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
