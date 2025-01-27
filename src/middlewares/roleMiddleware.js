const isAdmin =(req, res, next) =>{
    if(req.role === "admin"){next();
    } else {
        res.status(400).json({success :false,message: "Access denied. You do not have permission to perform this actoin"})
    }
}

const isVendor = (req, res, next) => {
    if (req.role === 'vendor') {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Access denied. You do not have permission to perform this action' });
    }
  };
module.exports = {isAdmin, isVendor}