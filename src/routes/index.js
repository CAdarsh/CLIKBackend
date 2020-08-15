const express = require('express');

const router = express.Router();

const { auth,authAndUpdate,adminAuth } = require("../middlewares");
const registerController = require("../controllers/register");
const loginController = require("../controllers/loginController");
const getDetails = require("../controllers/getDetails");
const { addAdmin,sendAdmin,deleteAdmin,loginAdmin } = require("../controllers/admin");


router.use('/member',express.static('public'));
router.use('/admin',express.static('public'));
router.use('/page',express.static('public'));

//admin
router.get('/admin',(req,res)=>{
    res.render('pages/dashboard.ejs');
})

// router.get('/admin/add',async (req,res)=>{
//   let result = await addAdmin(req.body); 
//   res.json(result)
// })

router.get('/admin/all', adminAuth,async (req,res)=>{
  let result = await sendAdmin(); 
  res.json(result)
})

router.get('/admin/delete', adminAuth,async (req,res)=>{
  let result = await deleteAdmin(); 
  res.json(result)
})


router.get('/admin/login',async (req,res)=>{
  res.render('pages/adminLogin.ejs');
})

router.post('/admin/login',async (req,res)=>{
  let result = await loginAdmin(req.body); 
  res.json(result)
})

router.get('/admin/register', (req, res) => {
  res.render('pages/register.ejs', {isError: false });
});

router.post('/admin/register', adminAuth, async (req, res) => {
  if(req.data){
    let token = await registerController.addNewUser(req.body);
    res.send("1");  
  }
  else{
    res.send("0");
  }
  });

//members area

router.get('/member',(req,res)=>{
  res.render('pages/login.ejs');
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
router.post('/member/details', authAndUpdate, (req, res) => {
  console.log(req.data)
  res.json(req.data);
});
router.post('/member/login', async (req, res) => {
  let response = await loginController.loginUser(req.body);
  console.log(response,req.body)
  res.json(response);
});

//public
router.get('/page/:slug', (req, res)=>{

  res.render('pages/memberDisplay.ejs',{slug:req.params.slug});
});

router.post('/page/details',async (req, res)=>{
  let result = await getDetails.getUser(req.body.slug);
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
