
const User = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const SECRET_KEY = "abhishekmaurya";

// register
exports.register = async (req, res) => {
    // Extract username, email, and password from request body
    const { username, email, password } = req.body;

    // Check if any required field is missing
    if (!username || !email || !password) {
        // Return error response if any required field is missing
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Return error response if user already exists
            return res.status(400).json({ error: "This user already exists" });
        }

        // Create a new user document
        const userData = new User({ username, email, password });

        // Save the new user document to the database
        await userData.save();

        // Return success response if user is successfully registered
        res.status(200).json({ message: "User successfully registered" });
    } catch (error) {
        // Return error response if any error occurs during registration process
        res.status(400).json({ error: "Something went wrong, please try again" });
    }
};

// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const userValid = await User.findOne({ email });

        if (!userValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // we can use user _id or email id
        const token = JWT.sign({ _id: userValid._id }, SECRET_KEY, {
            expiresIn: "1d" // Token expires in 1 day
        });

        userValid.tokens.push({ token }); // Store token in user document
        await userValid.save(); // Save user document

        res.status(200).json({ message: "User successfully logged in", token });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
};





// // Import necessary modules
// const User = require("../../model/user/userModel");
// const bcrypt = require("bcryptjs");
// const JWT = require("jsonwebtoken");
// const SECRET_KEY = "abhishekmaurya";

// // register
// exports.register = async(req,res) => {
//     // console.log("request body", req.body);
//     const {username, email, password} = req.body;

//     if(!username || !email || !password){
//         res.status(400).json({error:"All fields are required"})
//     }else{
//         try {
//             const existingUser = await User.findOne({email:email})            ;

//             if(existingUser){
//                 res.status(400).json({error:"This user is already exist"})
//             }else{
//                 const userData = new User({
//                     username, email, password
//                 });

//                 //password hasing
//                 await userData.save();
//                 res.status(200).json({message:"user Successfully registered"})
//             }
//         } catch (error) {
//             res.status(400).json({error:error})            
//         }
//     }
// }



 
// //* Login controller

// exports.login = async (req,res) => {
//     const{email,password} = req.body;   // Extract email and password from request body

//         // Check if email or password is missing
//     if(!email || !password){
//         res.status(200).json({error:"All fields are required"})
//     }else{
//         try {
//             // Find user by email in database
//             const userValid = await User.findOne({email:email});

//             // If user is found
//             if(userValid){
//                 // Compare passwords
//                 const isMatch = await bcrypt.compare(password,userValid.password);

//                 // If passwords match
//                 if(!isMatch){
//                     res.status(400).json({error:"invalid details"})
//                 }else{
//                     //token generate
//                     const token = JWT.sign({_id:userValid._id}, SECRET_KEY,{
//                         expiresIn:"id"  // Token expires in 1 day
//                     });

//                     // Store token in user document
//                     userValid.tokens.token = token;  // Assuming tokens is an array field in your User model
//                     await userValid.save();  // Save user document

//                     // Return success response with token
//                     res.status(200).json({message:"user sucessfully login", token})
//                 }
//             }else{
//                 // Return error response for non-existing user
//                 res.status(400).json({error:"This user is not exist"})
//             }
//         } catch (error) {
//             // Return error response for any caught errors
//             res.status(500).json({error:error.message})            
//         }
//     }
// }