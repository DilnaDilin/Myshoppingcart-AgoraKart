var express = require('express');
var router = express.Router();
var userHelpers=require('../helpers/userhelpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/view-products', { admin:false });
});

router.get('/login',(req,res)=>{
  
  res.render('user/login',{admin:false})
})

router.get('/signup',(req,res)=>{
  res.render('user/signup',{admin:false})
})

router.post('/signup',(req,res)=>{
  console.log(req.body);
  userHelpers.doSignup(req.body).then(()=>{
    res.redirect('/login');
  })
})
router.post('/login',(req,res)=>{
  console.log(req.body)

  userHelpers.checkuserlogin(req.body).then((data)=>{
    
    if(data){
      res.render('user/view-products',{admin:false})
    }else{
      req.session.userloginerror=true;
      res.redirect('/login')
    }
  })
  
})
module.exports = router;
