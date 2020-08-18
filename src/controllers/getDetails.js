
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

let isSlugAvail = async (slug) => {
    let user = await model.findOne({slug: slug});
    if(user){
        return 0;
    }
    else{
        return 1;
    }
}


module.exports= {
        getUser,
        isSlugAvail
    };