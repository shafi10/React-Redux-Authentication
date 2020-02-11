const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.userRegi = async (req,res)=>{
     try {
        const { name, email, password } = req.body;
         let user = await User.findOne({email})

         if(user){
             return res.status(404).json({msg:'User already exits'})
         }

         let hashedPassword = await bcrypt.hash(password , 10);

         user = new User({
             name, email,
             password:hashedPassword
         })

         await user.save();
         res.status(201).json({msg: ' User Created Successful'})

     } catch (error) {
         console.log(error);
     }
    
}

exports.userSignin = async (req,res)=>{
    try {
        const { email , password} = req.body
         let user =await User.findOne({email});
        
         if(!user){
             return res.status(404).json({msg:'Invalid Crediantials'})
         }

         let matchPass = await bcrypt.compare(password, user.password);

         if(!matchPass){
            return res.status(404).json({msg:'Invalid Crediantials'})
         }

       const payload = {
           user:{
               id:user.id
           }
       }

       jwt.sign(payload, 'Secret', {expiresIn: 360000},(error, token)=>{
              if(error) throw error;
              res.json({token})
       })

    } catch (error) {
        console.log(error)
    }
}

exports.getUser = async (req,res)=>{
try {
    const user = await User.findById(req.user.id);
    res.json(user)
} catch (error) {
    console.log(error)
}
}