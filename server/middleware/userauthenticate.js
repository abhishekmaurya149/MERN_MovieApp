const User = require("../model/user/userModel");
const JWT = require("jsonwebtoken");
const SECRET_KEY = 'abhishekmaurya'


const userauthenticate =  async (req, res,next) => {
    try {
        const token = req.headers.authorization;
        const verifytoken = JWT.verify(token, SECRET_KEY);
        const rootUser = await User.findOne({_id:verifytoken._id});
        // console.log("rootUser", rootUser);

        if(!rootUser){throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id
        req.userMainId = rootUser._id

        next();
    } catch (error) {
        response.status(400).json({error:"Unauthorized no token provide"})        
    }
}

module.exports = userauthenticate;