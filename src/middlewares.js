const jwt = require("jsonwebtoken");
let memberModel = require("./models/Member"); 

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

let auth = async (req,res,next) => {
  
  try {
    let token = req.header('Authorization').split(" ")[1];
    let data = jwt.verify(token,"lololol");
    let user = await memberModel.findOne({email: data.email})
    if(!user){
      throw new Error("Invalid Token");
    }
    else{
      req.dataJWT = user;
      next()
    }
  }
  catch(err) {
    console.log("Invalid");
    req.dataJWT = err;
    // res.redirect("/login");
  }
};

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = {
  notFound,
  errorHandler,
  auth
};
