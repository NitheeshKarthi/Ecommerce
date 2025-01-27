const { findUserByEmail, createUser } = require("../controllers/userController");
const generateToken = require("../utils/jwtUtils");
const { comparePasswords } = require("../utils/passwordUtils");
const {jwtAuthenticate }= require("../middlewares/jwtMiddleware");
const { isAdmin } = require("../middlewares/rolemiddleware");

 const signup = async (req, res) =>{
    try {
        const {email,role} =req.body;
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return res.status(400).json({sucess : false, message :  "User with this email already exists"});
        }
        if (role === "user" || role ==="vendor"){
       const user = await createUser(req.body)
        } else{
            return res.status(400).json({sucess : false, message :  "ROle Unautorized"});
        }
    res.status(200).json({sucess : true, message :  "Sign Up Successful"})
    } catch (error) {
        res.status(500).json({success:false,message :error.message});
    }
 }

 const staffsignup = async (req, res) =>{
    try {
        const {email,role} =req.body;
        const existingUser = await findUserByEmail(email)
        if(existingUser){
            return res.status(400).json({sucess : false, message :  "User with this email already exists"});
        }
        if (role === "staff"){
       const user = await createUser(req.body)
        } else{
            return res.status(400).json({sucess : false, message :  "ROle Unautorized"});
        }
    res.status(200).json({sucess : true, message :  "Sign Up Successful"})
    } catch (error) {
        res.status(500).json({success:false,message :error.message});
    }
 }

 const login = async (req, res) =>{
    try {
        const {email, password} =req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(400).json({sucess : false, message :  "User not found"});
        }

      const  isPasswordValid =await comparePasswords(password,user.password);
        if(!isPasswordValid){return res.status(400).json({sucess : false, message :  "Invalid Password"});}
      const token = generateToken(user.isSoftDeleted, user.role);
      return res.status(200).json({sucess : true, token, role : user.role});
    } catch (error) {
        return res.status(400).json({sucess : false, message : error.message});
    }
 }

 module.exports = {signup,staffsignup,login}