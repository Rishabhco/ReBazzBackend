const express=require('express')
const auth=require('../middleware/auth.js')
const itemController=require('../controllers/itemController.js')
const router=new express.Router()

router.get('/home',itemController.home);
router.post('/create',auth,itemController.create);
router.get('/findAll',itemController.findAll);
router.get('/findSpecific',itemController.findSpecific);
router.post('/findCatAll',itemController.findCatAll);


module.exports=router