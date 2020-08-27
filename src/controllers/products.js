const productModel = require('../models/Member').product;
const memberModel = require('../models/Member').member;

const addProduct = async (path, body, id) => {
  path = `${path.split('\\')[1]}\\${path.split('\\')[2]}`;
  if (body.price) {
    console.log('Hello');
    const product = new productModel({
      image: path,
      name: body.name,
      price: body.price,
      seller: id,
      desc: body.desc
    });
    const saveProduct = await product.save();
    // console.log(saveProduct);
    const User = (await memberModel.findOne({ _id: id }));
    User.products.push(saveProduct._id);
    const savedUser = await User.save();

    console.log(saveProduct);
  } else {
    const product = new productModel({
      image: path,
      name: body.name,
      seller: id
    });
    const saveProduct = await product.save();
    const User = (await memberModel.findOne({ _id: id }));
    User.products.push(saveProduct._id);
    const savedUser = await User.save();
    console.log(saveProduct);
  }
};

const delProduct = async (data) => {
  const { id } = data;
  console.log(id);
  const a = await productModel.deleteOne({ _id: id });
  return a;
};

module.exports = {
  addProduct,
  delProduct
};
