const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const memberModel = require('../models/Member');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const {
  auth, authAndUpdate, authForm, adminAuth
} = require('../middlewares');
const registerController = require('../controllers/register');
const loginController = require('../controllers/loginController');
const getDetails = require('../controllers/getDetails');
const productController = require('../controllers/products');
const {
  addAdmin,
  sendAdmin,
  deleteAdmin,
  loginAdmin,
} = require('../controllers/admin');

router.use('/member', express.static('public'));
router.use('/admin', express.static('public'));
router.use('/page', express.static('public'));

router.use((req, res, next) => {
  res.locals.logout = false;

  next();
});

// admin
router.get('/admin', (req, res) => {
  res.render('pages/adminPanel.ejs');
});

router.get('/admin/all', adminAuth, async (req, res) => {
  const result = await sendAdmin();
  res.json(result);
});

router.get('/admin/verify', adminAuth, async (req, res) => {
  res.send(req.data);
});

router.get('/admin/delete', adminAuth, async (req, res) => {
  const result = await deleteAdmin();
  res.json(result);
});

router.get('/admin/login', async (req, res) => {
  res.render('pages/adminLogin.ejs');
});

router.post('/admin/login', async (req, res) => {
  const result = await loginAdmin(req.body);
  console.log(req.body, result);
  res.json(result);
});

router.get('/admin/register', (req, res) => {
  res.render('pages/register.ejs', { isError: false });
});

router.post('/admin/register', adminAuth, async (req, res) => {
  if (req.data) {
    console.log(req.data);
    const token = await registerController.addNewUser(req.body);
    res.send('1');
  } else {
    res.send('0');
  }
});
router.post('/admin/deleteMember', adminAuth, async (req, res) => {
  if (req.body) {
    const result = await memberModel.member.deleteOne({ _id: req.body.id });
    res.send(result);
  }
});
// members area

router.get('/member', (req, res) => {
  res.render('pages/login.ejs');
});

router.get('/member/edit', (req, res) => {
  res.render('pages/memberEdit.ejs', { logout: true });
});

router.get('/member/page', (req, res) => {
  res.render('pages/member.ejs', { logout: true });
});

router.get('/member/all', async (req, res) => {
  console.log('hhh');
  const result = await registerController.returnUsers();
  res.send(result);
});
router.get('/member/details', auth, (req, res) => {
  res.send(req.dataJWT);
});
router.post(
  '/member/details',
  authForm,
  async (req, res) => {
    console.log(req.body);
    if (req.statusCode == 200) {
      if (req.body.image) {
        const data = {
          bEmail: req.body.cemail,
          bPhone: req.body.cphone,
          slug: req.body.cslug,
          location: req.body.cloc,
          title: req.body.cname,
          tagline: req.body.csdesc,
          content: req.body.cdesc,
          website: req.body.cwebsite,
          image: req.body.image,
        };
        const response = await getDetails.updateDetails(
          data,
          req.dataJWT.email
        );
        res.redirect('/member/page');
      } else {
        const data = {
          bEmail: req.body.cemail,
          bPhone: req.body.cphone,
          slug: req.body.cslug,
          location: req.body.cloc,
          title: req.body.cname,
          tagline: req.body.csdesc,
          content: req.body.cdesc,
          website: req.body.cwebsite,
        };
        const response = await getDetails.updateDetails(
          data,
          req.dataJWT.email
        );
        console.log(response);
        res.redirect('/member/page');
        // res.send(response);
      }
    } else {
      res.status(403).send('Unauthorised request');
    }
  }
);
router.post('/member/login', async (req, res) => {
  const response = await loginController.loginUser(req.body);
  console.log(response, req.body);
  res.json(response);
});

router.get('/member/slug/:slug', async (req, res) => {
  const result = await getDetails.isSlugAvail(req.params.slug);
  console.log(result);
  if (result != 1) {
    res.json({ result: 0, imageRef: result.imageRef });
  } else {
    res.json({ result });
  }
});

router.get('/member/email/:email', async (req, res) => {
  const result = await getDetails.isEmailAvail(req.params.email);
  console.log(result);
  res.json({ result });
});

router.post(
  '/member/product',
  authForm,
  async (req, res) => {
    const { body } = req;
    console.log('Yes');
    console.log(body);
    if (req.statusCode == 200) {
      productController.addProduct(body.image, body, req.dataJWT._id);
      res.render('pages/member.ejs', { logout: true });
    } else {
      res.send('Not Authorized');
    }
  }
);

router.post(
  '/member/product/edit',
  authForm,
  async (req, res) => {
    const { body } = req;
    console.log('Yes');
    console.log(body);
    if (req.statusCode == 200) {
      productController.editProduct(body, body.productId);
      res.render('pages/member.ejs', { logout: true });
    } else {
      res.send('Not Authorized');
    }
  }
);

router.get('/demo', async (req, res) => {
  const result = await memberModel.member.find({}).populate('products');
  res.send(result);
});

router.delete('/member/product', auth, async (req, res) => {
  const result = await productController.delProduct(req.body);
  res.send(result);
});

router.get('/delete/:id', adminAuth, async (req, res) => {
  const member = await memberModel.findOne({ _id: req.params.id });
  if (member.image.split('\\')[2]) {
    fs.unlink(`public/uploads/${member.image.split('\\')[2]}`, (err) => {
      if (err) throw err;
      console.log('image was deleted');
    });
  }
  memberModel.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.redirect('/admin');
    }
  });
});

// public
router.get('/page/:slug', (req, res) => {
  res.render('pages/memberDisplay.ejs', {
    slug: req.params.slug,
  });
});

router.post('/page/details', async (req, res) => {
  const result = await getDetails.getUser(req.body.slug);
  console.log(result);
  res.json(result);
});

router.get('/', (req, res) => {
  res.render('pages/members.ejs');
});

router.get('/404', (req, res) => {
  res.render('pages/members.ejs');
});

module.exports = router;
