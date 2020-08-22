const productModel = require('../models/Member').product;
const memberModel = require('../models/Member').member;

const addProduct = async (path, id) => {
  path = `${path.split('\\')[1]}\\${path.split('\\')[2]}`;

  const product = new productModel({
    image: path,
    seller: id
  });
  const saveProduct = await product.save();

  const User = (await memberModel.findOne({ _id: id }));
  User.products.push(saveProduct._id);
  const savedUser = await User.save();

  console.log(saveProduct);
};

module.exports = {
  addProduct
};
