"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routerblog = express.Router();
const userController_1 = __importDefault(require("../user/userController"));
const blogController_1 = __importDefault(require("../blog/blogController"));
const loginContoller_1 = __importDefault(require("../login/loginContoller"));
//create the blog 
routerblog.post('/createblog', blogController_1.default.upload, userController_1.default.verifyjwt, blogController_1.default.createBlog);
//list the blog
routerblog.get('/viewblog', userController_1.default.verifyjwt, loginContoller_1.default.checkuser(["admin", "super"]), blogController_1.default.ViewUser);
//update the blog
routerblog.put('/update', userController_1.default.verifyjwt, blogController_1.default.updateBlog);
//delete th blog
routerblog.delete('/delete', userController_1.default.verifyjwt, blogController_1.default.deleteBlog);
routerblog.put('/upsert', userController_1.default.verifyjwt, blogController_1.default.Upsert);
routerblog.post('/blk', userController_1.default.verifyjwt, blogController_1.default.bulk);
routerblog.get('/view', userController_1.default.verifyjwt, blogController_1.default.ViewUserin);
///image uplode
// routerblog.post("/image",token.verifyjwt ,(req:any, res:any) => {
//     blog.upload(req, res, (err:any) => {
//      if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//      res.send(req.file);
//    });
//  });
exports.default = routerblog;
