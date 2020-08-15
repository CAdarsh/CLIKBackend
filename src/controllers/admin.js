const jwt = require("jsonwebtoken");
const adminModel = require("../models/Admin");



let loginAdmin = async (data) => {
    let { email,password } = data;
    let resultUser = await adminModel.findOne({email,password});
    if (resultUser){
        let token = jwt.sign({email:email,password:password},"lololol")
        return {
            status: 200,
            token: token
        }
    }
    else{
        return {
            status: 403
        }
    }
}


let addAdmin = async ({email,password}) => {
    let token = jwt.sign({
        email: email,
        password: password
    },"lololol");

    console.log(token)

    let newUser = new adminModel({
        email: email,
        password: password,
        tokens: [{token}]
    });

    let result = await newUser.save();
    console.log(result); 
    return result;
} 

let sendAdmin = async () => {
    return await adminModel.find({});
}

let deleteAdmin = async () => {
    return await adminModel.deleteMany({});
}

exports.addAdmin = addAdmin;
exports.sendAdmin = sendAdmin;
exports.loginAdmin = loginAdmin;
exports.deleteAdmin = deleteAdmin;