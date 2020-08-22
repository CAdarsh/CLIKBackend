const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const memberModel = require('../models/Member');

const addNewUser = async (data) => {
  const token = jwt.sign({ email: data.email }, 'lololol');
  console.log(data);
  data.tokens = [{ token }];
  try {
    const newMember = new memberModel(data);
    return await newMember.save().then(() => { console.log('Done'); return token; }).catch((err) => { console.log(err); return err.toString(); });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const returnUsers = async () => {
  const result = await memberModel.member.find({});
  console.log(result);
  return result;
};

exports.addNewUser = addNewUser;
exports.returnUsers = returnUsers;
