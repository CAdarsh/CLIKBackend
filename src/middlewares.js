const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const memberModel = require('./models/Member');
const adminModel = require('./models/Admin');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage,
}).single('myImage');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const data = jwt.verify(token, 'lololol');
    const user = await memberModel.member.findOne({ email: data.email }).populate('products');
    // const buser = (await memberModel.product.find()).populate('products');
    console.log(user);
    if (!user) {
      throw new Error('Invalid Token');
    } else {
      req.dataJWT = user;
      req.statusCode = 200;
      next();
    }
  } catch (err) {
    console.log('Invalid');
    req.dataJWT = err;
    req.statusCode = 403;
    next();
    // res.redirect("/login");
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const data = jwt.verify(token, 'lololol');
    const user = await adminModel
      .findOne({ email: data.email, password: data.password })
      .catch((err) => console.log(err));
    console.log(user);
    if (!user) {
      throw new Error('Invalid Token');
    } else {
      req.data = user;
      next();
    }
  } catch (err) {
    console.log('bad');
    req.data = false;
  }
};

const authAndUpdate = (req, res, next) => {
  // try {
  const {
    content, bEmail, bPhone, website, title, location, slug
  } = JSON.parse(
    req.headers.contents
  );

  const token = req.header('Authorization').split(' ')[1];
  const data = jwt.verify(token, 'lololol');

  upload(req, res, async (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.file);
      const user = await memberModel.findOne({ slug });
      if (!user) {
        throw new Error('Invalid Token');
      } else if (req.file) {
        req.data = await memberModel.updateOne(
          { slug },
          {
            content,
            bEmail,
            bPhone,
            website,
            title,
            location,
            image: req.file.path.split('public')[1],
          }
        );
        console.log({
          content,
          bEmail,
          bPhone,
          website,
          title,
          location,
          image: req.file.path.split('public')[1],
        });
      } else {
        req.data = await memberModel.updateOne(
          { slug },
          {
            content, bEmail, bPhone, website, title, location
          }
        );
        console.log({
          content, bEmail, bPhone, website, title, location
        });
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
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  auth,
  authAndUpdate,
  adminAuth,
};
