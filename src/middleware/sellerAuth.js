const jwt=require('jsonwebtoken')
const Seller=require('../models/seller.js')

const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'code')
        const seller=await Seller.findOne({_id:decoded._id,'tokens.token':token})

        if(!seller){
            throw new Error()
        }
        req.token=token
        req.seller=seller
        next()
    }catch(error){
        res.status(401).send({
            message:'Please Authenticate',
            error
        })
    }
}

module.exports=auth