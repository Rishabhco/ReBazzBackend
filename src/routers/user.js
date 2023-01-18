const express=require('express')
const auth=require('../middleware/auth.js')
const userController=require('../controllers/userController.js')
const router=new express.Router()

router.get('/',userController.home);
router.post('/signup',userController.createUser);
router.get('/read',auth,userController.readUser);
router.patch('/updateUser/:id',auth,userController.updateUser);
router.post('/login',userController.login);
router.post('/logout',auth,userController.logout);

module.exports=router