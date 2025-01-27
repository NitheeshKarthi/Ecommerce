const  Product  = require('../models/product');
const { generateUniqueUrl } = require('../utils/urlUtils');

// Create Product
const createProduct = async (req, res) => {
  try {
    
    
    const { name, description, category, price, oldPrice, deliveryAmount, deliveryFree, startDate } = req.body;
    const vendorId = req.userId; // Assuming vendorId is passed by JWT authentication

    const expiryDate = new Date(startDate);
    expiryDate.setDate(expiryDate.getDate() + 7); // Expiry after 7 days

     const url = await generateUniqueUrl(name); // Function to create a unique URL
    
    // Upload image if provided (store the image URL or path)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = await Product.create({
      name, description, category, price, oldPrice, deliveryAmount, deliveryFree, startDate, expiryDate, vendorId, url, imageUrl
    });

    res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// // Get Products (Admin, Staff, Vendor)
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll({
//       where: req.user.role === 'admin' ? {} : { vendorId: req.user.id }
//     });
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const getProducts = async (req, res) => {
    try {
        if (req.role === 'admin') {
            // Admin sees all products
            const products = await Product.findAll();
            return res.status(200).json({ success: true, products });
        } else if (req.role === 'vendor') {
            // Vendor sees their own products
            const products = await Product.findAll({ where: { vendorId: req.userId } });
            return res.status(200).json({ success: true, products });
        } else {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Search Products
const searchProducts = async (req, res) => {
  const { searchTerm } = req.query;
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${searchTerm}%`,
        },
      },
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProduct, getProducts, searchProducts };
