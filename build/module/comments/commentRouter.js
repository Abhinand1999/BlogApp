"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routerComment = express.Router();
const userController_1 = __importDefault(require("../user/userController"));
const commentController_1 = __importDefault(require("../comments/commentController"));
//create the comment
routerComment.post('/createcomment', userController_1.default.verifyjwt, commentController_1.default.createComments);
//list the comment
routerComment.get('/viewComment', userController_1.default.verifyjwt, commentController_1.default.viewcomment);
//delete the comment
routerComment.delete('/deleteComment', userController_1.default.verifyjwt, commentController_1.default.deleteComment);
exports.default = routerComment;
