const jwt = require("jsonwebtoken");
let memberModel = require("./models/Member");
let adminModel = require("./models/Admin");
const path = require("path");
let multer = require("multer");
let storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let upload = multer({
  storage: storage,
}).single("myImage");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

let auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").split(" ")[1];
    let data = jwt.verify(token, "lololol");
    let user = await memberModel.findOne({ email: data.email });
    if (!user) {
      throw new Error("Invalid Token");
    } else {
      req.dataJWT = user;
      next();
    }
  } catch (err) {
    // console.log("Invalid");
    req.dataJWT = err;
    // res.redirect("/login");
  }
};

let adminAuth = async (req, res, next) => {
  try {
    let token = req.header("Authorization").split(" ")[1];
    let data = jwt.verify(token, "lololol");
    let user = await adminModel
      .findOne({ email: data.email, password: data.password })
      .catch((err) => console.log(err));
    console.log(user);
    if (!user) {
      throw new Error("Invalid Token");
    } else {
      req.data = user;
      next();
    }
  } catch (err) {
    console.log("bad");
    req.data = false;
  }
};

let authAndUpdate = (req, res, next) => {
  // try {
  let { content, bEmail, bPhone, website, title, location, slug } = JSON.parse(
    req.headers.contents
  );

  let token = req.header("Authorization").split(" ")[1];
  let data = jwt.verify(token, "lololol");

  upload(req, res, async (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.file);
      let user = await memberModel.findOne({ slug: slug });
      if (!user) {
        throw new Error("Invalid Token");
      } else {
        if (req.file) {
          req.data = await memberModel.updateOne(
            { slug: slug },
            {
              content,
              bEmail,
              bPhone,
              website,
              title,
              location,
              image: req.file.path.split("public")[1],
            }
          );
          console.log({
            content,
            bEmail,
            bPhone,
            website,
            title,
            location,
            image: req.file.path.split("public")[1],
          });
        } else {
          req.data = await memberModel.updateOne(
            { slug: slug },
            { content, bEmail, bPhone, website, title, location }
          );
          console.log({ content, bEmail, bPhone, website, title, location });
        }
      }
      res.json(JSON.parse(req.headers.contents));
    }
    next();
  });

  // }
  // catch(err) {
  //   console.log("Invalid");
  //   req.dataJWT = err;
  // }
};

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  auth,
  authAndUpdate,
  adminAuth,
};
