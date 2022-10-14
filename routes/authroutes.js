const express =require('express');
const authRoutes = express.Router();
const User = require('../models/user');
const {hashGenerate} = require('../helpers/hashing');
const {hashValidator} = require('../helpers/hashing');
const {tokenGenerator} = require('../helpers/token');
const authVerify = require('../helpers/authVerify');
authRoutes.post('/signup', async (req,res)=>{
    try{
        const hashPassword = await hashGenerate(req.body.password);
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        });
        const savedUser = await user.save();
        res.send(savedUser)
    }
    catch(error){
        res.send(error)
    }
    
})

authRoutes.post("/signin", async (req,res)=>{
    try{
        const existinguser = await  User.findOne({email:req.body.email});
        if(!existinguser){
            res.send("email is invalid")
        }else{

            // const  checkuser= await hashValidator(req.body.password,hashPassword)
            
            const checkuser= await hashValidator(req.body.password,existinguser.password)
            if(!checkuser){
                res.send("password is invalid")
            }else{
                const token =  await  tokenGenerator(existinguser.email)
                res.cookie('jwt',token);
                console.log(req.cookies)
                res.send(token)
            }
        }
    }
catch(error){
res.send(error)
}    

})
authRoutes.get("/protected",authVerify,(req,res)=>{
    res.send("I am protected route")
})

module.exports = authRoutes;  