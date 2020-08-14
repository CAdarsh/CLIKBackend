const mongoose = require('mongoose');
const memberModel = require('../models/Member');
const jwt = require('jsonwebtoken');

let addNewUser = async (data) => {
  const token = jwt.sign({email: data.email},"lololol")
  console.log(data)
  data.tokens = [{token}];
  try{
    const newMember = new memberModel(data);
    return await newMember.save().then(()=>{console.log("Done"); return token;}).catch(err=>{console.log(err); return err.toString(); });
  }
  catch(err){
    console.log(err)
    return err;
  }
  
}

let returnUsers = async () => {
    let result = await memberModel.find({});
    return result;
}

exports.addNewUser = addNewUser;
exports.returnUsers = returnUsers;