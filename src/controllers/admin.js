const jwt = require('jsonwebtoken');
const adminModel = require('../models/Admin');

const loginAdmin = async (data) => {
  const { email, password } = data;
  const resultUser = await adminModel.findOne({ email, password });
  if (resultUser) {
    const token = jwt.sign({ email, password }, 'lololol');
    return {
      status: 200,
      token,
    };
  }
  return {
    status: 403,
  };
};

const addAdmin = async ({ email, password }) => {
  const token = jwt.sign(
    {
      email,
      password,
    },
    'lololol'
  );

  console.log(token);

  const newUser = new adminModel({
    email,
    password,
    tokens: [{ token }],
  });

  const result = await newUser.save();
  console.log(result);
  return result;
};

const updatePassword = async ({ email, password, newPassword }) => {
  const result = await adminModel.updateOne({ email, password }, { password: newPassword });
  return result;
};

const sendAdmin = async () => await adminModel.find({});

const deleteAdmin = async () => await adminModel.deleteMany({});

exports.addAdmin = addAdmin;
exports.sendAdmin = sendAdmin;
exports.loginAdmin = loginAdmin;
exports.deleteAdmin = deleteAdmin;
exports.updatePassword = updatePassword;
