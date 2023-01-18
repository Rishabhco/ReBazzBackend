const express=require('express')
const router=new express.Router()

router.get('/',(req,res)=>{
    try{
        res.status(200).send({
            message:"Welcome to ReBazz API"
        });
    }catch(error){
        res.status(400).send({
            message:"Something went wrong",
            error
        });
    }
});
module.exports=router