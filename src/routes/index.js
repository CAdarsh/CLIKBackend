const express = require('express');

const router = express.Router();

const { auth } = require("../middlewares");
const registerController = require("../controllers/register");
const loginController = require("../controllers/loginController");
const getDetails = require("../controllers/getDetails");

router.use('/member',express.static('public'));
router.use('/admin',express.static('public'));
router.use('/page',express.static('public'));

//admin
router.get('/admin',(req,res)=>{
  res.render('pages/dashboard.ejs');
})

router.get('/admin/register', (req, res) => {
  res.render('pages/register.ejs', {isError: false });
});

router.post('/admin/register', async (req, res) => {
  let token = await registerController.addNewUser(req.body);
  res.send(token);
});

//members area

router.get('/member',(req,res)=>{
  res.render('pages/index.ejs');
})

router.get('/member/edit',(req, res) => {
  res.render('pages/member.ejs');
});

router.get('/member/all', async (req, res) => {
  let result = await registerController.returnUsers();
  console.log(req.headers)
  res.send(result);
});
router.get('/member/details', auth, (req, res) => {
  console.log(req.dataJWT)
  res.send(req.dataJWT);
});
router.post('/member/login', async (req, res) => {
  let response = await loginController.loginUser(req.body);
  res.json(response);
});

//public
router.get('/page/:slug', (req, res)=>{
  res.render('pages/memberDisplay.ejs',{slug:req.params.slug});
});

router.post('/page/details',async (req, res)=>{
  console.log(req.body)
  let result = await getDetails.getUser(req.body.slug);  
  // res.json(result);
});


router.get('/', (req, res) => {
  res.render('pages/members.ejs');
});


module.exports = router;
