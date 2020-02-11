const express= require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const { userRegi, userSignin, getUser} = require('../controllers/userController')

router.post('/signup', userRegi);
router.post('/login', userSignin);
router.get('/user',auth, getUser);

module.exports= router;