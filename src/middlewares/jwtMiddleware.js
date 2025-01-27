const jwt = require('jsonwebtoken');

const jwtAuthenticate  = (req, res, next) => {

const token = req.header('token');

if (!token) {
return res.status(401).json({success: false, message: 'Access denied. Token not provided.' });
}
try {   
const decoded = jwt.verify (token, process.env.JWT_SECRET);
req.userId = decoded.userId
req.role = decoded.role;
next();
} catch (error) {
res.status(401).json({ success: false, message: 'Invalid token' });
}
};

module.exports = {jwtAuthenticate}