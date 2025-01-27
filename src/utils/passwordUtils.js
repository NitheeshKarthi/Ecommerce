const bcrypt = require('bcrypt');

async function hashPassword(password) {

try {

const hashedPassword = await bcrypt.hash (password, 10)
 return hashedPassword;

} catch (error) {
throw new Error('Error hashing password');
}
};

async function comparePasswords (plainPassword, hashedPassword){
try {
const isPasswordValid = await bcrypt.compare (plainPassword, hashedPassword);
return isPasswordValid;
} catch (error) {
throw new Error('Error comparing passwords');
}
};

module.exports = { hashPassword, comparePasswords };