require('dotenv').config();
const mongoose=require('mongoose')

const db=process.env.URI;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database is connected !!!");
}).catch((err)=>{
    console.log(err);
    console.log("Connection has not been extablished with database !!!");
})