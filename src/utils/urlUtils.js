const  Product  = require('../models/product');

const generateUniqueUrl = async (name) => {
  let url = name.toLowerCase().replace(/ /g, '-');
  let existingProduct = await Product.findOne({ where: { url } });

  if (existingProduct) {
    url += `-${Date.now()}`;
  }

  return url;
};

module.exports = { generateUniqueUrl };
