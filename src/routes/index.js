const express = require('express');

const router = express.Router();

const { auth } = require("../middlewares");


const registerController = require("../controllers/register");
const loginController = require("../controllers/loginController");





router.get('/member',  (req, res) => {
  res.render('pages/member.ejs');
});

router.get('/members', async (req, res) => {
  let result = await registerController.returnUsers();
  console.log(req.headers)
  res.send(result);
});



router.get('/register', (req, res) => {
  res.render('pages/register.ejs', {isError: false });
});

router.post('/register', async (req, res) => {
  let token = await registerController.addNewUser(req.body);
  res.send(token);
});

router.get('/member/details', auth, (req, res) => {
  console.log(req.dataJWT)

  res.send(req.dataJWT);
});

router.get('/login', (req, res) => {
  res.render('pages/index.ejs');
});

router.post('/login', async (req, res) => {
  let response = await loginController.loginUser(req.body);
  res.json(response);
});


router.get('/', (req, res) => {
  res.render('pages/dashboard.ejs');
});


module.exports = router;
