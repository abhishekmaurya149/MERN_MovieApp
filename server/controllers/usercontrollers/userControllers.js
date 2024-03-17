const userDB = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");
constJWT = reuire("jsonwebtoken");
const SECRET_KEY = "abhishek";

// register
exports.register = async(req,res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400).json({error:"All fields are required"})
    }else{
        try {
            const existingUser = await userDB.findOne({email:email})            ;

            if(existingUser){
                res.status(400).json({error:"This user is already exist"})
            }else{
                const userData = new userDB({
                    username, email, password
                });
                await userData.save();
                res.status(200).json({message:"user Successfully registered"})
            }
        } catch (error) {
            res.status(400).json({error:error})            
        }
    }
}

//login

exports.login = async (req,res) => {
    const{email,password} = req.body;
    if(!email || !password){
        res.status(200).json({error:"All fields are required"})
    }else{
        try {
            const userValid = await userDB.findOne({email:email});

            if(userValid){
                const isMatch = await bcrypt.compare(password,userValid.password);

                if(!isMatch){
                    res.status(400.json({error:"invalid"}))
                }
            }
        } catch (error) {
            
        }
    }
}