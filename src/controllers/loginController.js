
let model = require("../models/Member");  
let jwt = require('jsonwebtoken');

let loginUser = async (data) => {
    let { email, password } = data;
    let resultUser = await model.findOne({email: email,password: password});
    if (resultUser){
        let token = jwt.sign({email: data.email},"lololol")
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

exports.loginUser = loginUser;