const express = require('express');
const routerlog = express.Router();
import users from '../../module/login/loginContoller'
// routeruser.use(user)


//register
routerlog.post('/Register',users.bulk);
routerlog.get('/login',users.login)

routerlog.get('/view',users.verifyjwt,users.checkuser,users.view)


export default routerlog