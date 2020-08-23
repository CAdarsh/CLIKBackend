const jwt = require('jsonwebtoken');
const model = require('../models/Member');

const getUser = async (slug) => {
  const resultUser = await model.member.findOne({ slug });
  if (resultUser) {
    return {
      status: 200,
      data: resultUser
    };
  }

  return {
    status: 403
  };
};

const isSlugAvail = async (slug) => {
  const user = await model.member.findOne({ slug });
  if (user) {
    return 0;
  }

  return 1;
};

const updateDetails = async (data, email) => {
  try {
    const user = await model.member.findOne({ email });
    return await user.updateOne(data);
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUser,
  updateDetails,
  isSlugAvail
};
