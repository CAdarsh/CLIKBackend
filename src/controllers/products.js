const productModel = require('../models/Member').product;
const memberModel = require('../models/Member').member;

const addProduct = async (path, body, id) => {
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
    const User = (await memberModel.findOne({ _id: id }));
    User.products.push(saveProduct._id);
    const savedUser = await User.save();

    console.log(saveProduct);
  } else {
    const product = new productModel({
      image: path,
      name: body.name,
      seller: id,
      desc: body.desc
    });
    const saveProduct = await product.save();
    const User = (await memberModel.findOne({ _id: id }));
    User.products.push(saveProduct._id);
    const savedUser = await User.save();
    console.log(saveProduct);
  }
};

const editProduct = async (body, id) => {
  console.log(body);
  delete body.id;
  delete body.productId;
  const keys = Object.keys(body);
  keys.map((data) => {
    if (body[data] == '') { delete body[data]; }
  });
  console.log(body);
  const product = await productModel.updateOne({ _id: id }, body);
  console.log(product);
  return 'Success';
};

const delProduct = async (data) => {
  const { id } = data;
  console.log(id);
  const a = await productModel.deleteOne({ _id: id });
  return a;
};

module.exports = {
  addProduct,
  delProduct,
  editProduct
};
