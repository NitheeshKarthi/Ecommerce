const express =require("express");
const router = express.Router();
const {signup,login, staffsignup} =require("../services/userService");
const { jwtAuthenticate } = require("../middlewares/jwtMiddleware");
const { isAdmin } = require("../middlewares/rolemiddleware");

router.post("/signup", signup);
router.post("/staff/signup",jwtAuthenticate,isAdmin,staffsignup);
router.post("/login", login);

module.exports =router;