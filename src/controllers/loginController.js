const jwt = require('jsonwebtoken');
const model = require('../models/Member');

const loginUser = async (data) => {
  const { email, password } = data;
  console.log(email, password);
  const resultUser = await model.member.findOne({ email, password });
  if (resultUser) {
    const token = jwt.sign({ email: data.email }, 'lololol');
    return {
      status: 200,
      token
    };
  }

  return {
    status: 403
  };
};

exports.loginUser = loginUser;
