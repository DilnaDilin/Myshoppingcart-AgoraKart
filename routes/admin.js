var express = require('express');
var router = express.Router();
var adminHelpers=require('../helpers/adminhelpers');


/* GET admin listing. */
router.get('/', function(req, res, next) {
  console.log('tyyy',req.session.adminloggedIn)
  if(req.session.adminloggedIn){
    res.render('admin/view-products', { admin:true ,user:req.session.admin});
  
    
  }else{
    console.log("ssss",req.session.admin)
    let error={};
    if(req.session.adminloginErr){
      error.status=true;
      error.value="Invalid Login Data"
    }
    req.session.adminloginErr=false;
    res.render('admin/login', { admin:true,error});
   
  }
  
});

router.get('/view-products',(req,res)=>{
    if(req.session.admin){
      adminHelpers.getProducts().then((products)=>{
        console.log("ll",products)
        res.render('admin/view-products', { admin:true ,user:req.session.admin,products});
      })
      
      //res.redirect('/admin/view-products')
  }else{
    res.redirect('/admin');
}
  
})
//its login route
router.post('/view-products',(req,res)=>{ 

    adminHelpers.checkLogin(req.body).then((adminResponse)=>{
      if(adminResponse.status){
        
        req.session.admin=adminResponse.user;
        console.log('session',req.session.admin)
        if (req.session.admin)
        {
          req.session.adminloggedIn=true;
        }
        //res.render('admin/view-products', { admin:true ,user:req.session.admin});
        res.redirect('/admin/view-products')
      }else {
        console.log("not success")
        req.session.adminloginErr=true;
        res.redirect('/admin')
        
      }
    }); 
})
router.get('/logout',(req,res)=>{
  req.session.admin={};
  req.session.adminloggedIn=false;
  res.redirect('/admin')
})
router.get('/add-products',(req,res)=>{
  if(req.session.admin){
    productadded="";
    if(req.session.adminProdAdd){ 
      productadded="Product added Successfully";
    }
      req.session.adminProdAdd=false;
      console.log(productadded)
      res.render('admin/add-products',{admin:true,user:req.session.admin,productadded})
    
    
  }else{
    res.redirect('/admin');
  }
  
})
router.post('/add-products',(req,res)=>{
  
  image=req.files.Image

  adminHelpers.addProduct(req.body).then((id)=>{
    image.mv('./public/images/product-images/'+id+'.jpg',(err,done)=>{
      if(err){
        console.log(err)
      }else{
        req.session.adminProdAdd=true;
        res.redirect('/admin/add-products')
       
      }
    })
   
  })
})

module.exports = router;
