const express = require('express');
const app = express();
const authRoutes =require('./routes/authroutes');
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config(); 

//db connect
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('database connected .. ')
});
app.use(cookieParser());
app.use(express.json());
//Routes
app.use('/api/user',authRoutes)



app.listen(5000,()=>{
console.log('server running ...')
})