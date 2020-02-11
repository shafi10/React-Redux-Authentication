const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://shafi:shafi100@ds045627.mlab.com:45627/login-registration',{useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log('database connected');
})

const userRoute= require('./routes/user')

app.use(express.json({ extended:false}));

app.use(userRoute);
app.use((req,res)=>{
    res.json('hello');
})


app.listen(5000, ()=>{
    console.log('server running on port 3000')
})