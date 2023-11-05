const express = require('express');
const routeruser = express.Router();
import user from '../user/userController'

//register
routeruser.post('/Register',user.Register);

//login
routeruser.get('/login',user.login)


export default routeruser