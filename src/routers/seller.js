const express=require('express')
const sellAuth=require('../middleware/sellerAuth.js')
const sellerController=require('../controllers/sellerController.js')
const router=new express.Router()

router.get('/',sellerController.home);
router.post('/signup',sellerController.createSeller);
router.get('/read',sellAuth,sellerController.readSeller);
router.patch('/updateUser/:id',sellAuth,sellerController.updateSeller);
router.post('/login',sellerController.login);
router.post('/logout',sellAuth,sellerController.logout);

module.exports=router