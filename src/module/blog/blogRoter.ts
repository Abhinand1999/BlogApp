const express = require('express');
const routerblog = express.Router();
import token from '../user/userController'
import blog from '../blog/blogController'
import loginContoller from '../login/loginContoller';


//create the blog 
routerblog.post('/createblog',blog.upload,token.verifyjwt,blog.createBlog)

//list the blog
routerblog.get('/viewblog',token.verifyjwt,loginContoller.checkuser(["admin","super"]),blog.ViewUser)


//update the blog

routerblog.put('/update',token.verifyjwt,blog.updateBlog)



//delete th blog
routerblog.delete('/delete',token.verifyjwt,blog.deleteBlog)

routerblog.put('/upsert',token.verifyjwt,blog.Upsert)

routerblog.post('/blk',token.verifyjwt,blog.bulk)




routerblog.get('/view',token.verifyjwt,blog.ViewUserin)

//last 7 days data

routerblog.get('/lastweekRegister',token.verifyjwt,blog.lastweekblog)





///image uplode

// routerblog.post("/image",token.verifyjwt ,(req:any, res:any) => {
//     blog.upload(req, res, (err:any) => {
//      if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//      res.send(req.file);
     
//    });
//  });

export default routerblog