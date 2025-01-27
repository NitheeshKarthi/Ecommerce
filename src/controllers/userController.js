const {hashPassword, comparePasswords} = require("../utils/passwordUtils")
const User =require("../models/user");

async function findUserByEmail(email) {

    try {
    const user = await User.findOne({ where: { email } });
    return user;
    } catch (error) {
    console.log(error);
    throw error;
    }
}

async function createUser(user) {
    try {
    const hashedPassword = await hashPassword(user.password);
    const newUser = await User.create({
    email: user.email,
    password: hashedPassword,
    username: user.username,
    role: user.role,
    });
    return newUser;
    } catch (error) {
    console.log(error); throw error;
    }
}
 module.exports ={findUserByEmail,createUser}