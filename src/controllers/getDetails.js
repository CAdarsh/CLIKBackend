
let model = require("../models/Member");  
let jwt = require('jsonwebtoken');

let getUser = async (slug) => {
    let resultUser = await model.findOne({slug: slug});
    if (resultUser){
        return {
            status: 200,
            data: resultUser
        }
    }
    else{
        return {
            status: 403
        }
    }
}

exports.getUser = getUser;