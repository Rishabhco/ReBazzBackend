const Seller = require('../models/seller.js')

const home=(req,res)=>{
    console.log("Hello this is backend server of ReBazz for Code.pdf");
    res.status(200).send("Hello this is backend server of ReBazz for Code.pdf");
}

const createSeller=async(req,res)=>{
    const seller=new Seller(req.body)
    try{
        const token=await seller.generateAuthToken()
        await seller.save()
        res.status(201).send({
            message:"Seller has been created !!!",
            data:seller
        })
     }catch(error){
        res.status(400).send(error)
    }
}

const login =async(req,res)=>{
    try{
        const seller=await Seller.findByCredentials(req.body.username,req.body.password)
        const token=await seller.generateAuthToken()
        res.status(200).send({
            message:"Login successfully done",
            data:{seller,token}
        })
    }catch(error){
        res.status(400).send(error)
    }    
}

const readSeller=async(req,res)=>{
    try{
        res.status(200).json({
            status: true,
            message: "Here is your profile",
            errors: [],
            data: req.seller,
          });
    }catch(error){
        res.status(400).json({
            status: false,
            message: "Unable to fetch your profile",
            errors: error,
            data: {},
          });
    }
}

const updateSeller=async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','contact','aboutYou','domian','exp','linUrl','portLink','skills']
    const isValidOpration=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValidOpration){
        return res.status(400).send('Invalid updates!')
    }
    try{
        const id=req.params.id
        const seller=await Seller.findById(id)
        
        updates.forEach((update)=>user[update]=req.body[update])
        
        await seller.save()
    
        // const user=await User.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})
        if(!seller){
            res.status(404).json({
                status: false,
                message: "No user found!!!",
                errors: error,
                data: {},
            });
        }
        res.status(200).json({
            status: true,
            message: "Your profile has been updated !!!",
            errors: [],
            data: seller,
          });
    }catch(error){
        res.status(500).json({
            status: false,
            message: "Unable to fetch your profile",
            errors: error,
            data: {},
        });
    }
}


const logout =async(req,res)=>{
    try{
        req.seller.tokens=req.seller.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.seller.save()
        res.send("You have been successfully logged out !!!")
    }catch(error){
        res.status(500).send("Error Occured !!! The error is :",error)
    }
}

module.exports={
    login,logout,home,createSeller,readSeller,updateSeller
}