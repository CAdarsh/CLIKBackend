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
  const user = await model.findOne({ slug });
  if (user) {
    return 0;
  }

  return 1;
};

module.exports = {
  getUser,
  isSlugAvail
};
