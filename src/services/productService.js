const { Product } = require('../models/product');

const generateUniqueUrl = async (name) => {
  // Logic to create a unique URL (e.g., slugify the product name and ensure it doesn't already exist in the database)
  let url = name.toLowerCase().replace(/ /g, '-');
  let existingProduct = await Product.findOne({ where: { url } });

  if (existingProduct) {
    url += `-${Date.now()}`; // Append timestamp to make URL unique
  }

  return url;
};

module.exports = { generateUniqueUrl };
