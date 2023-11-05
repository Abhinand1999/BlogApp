"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const userRouter_1 = __importDefault(require("./module/user/userRouter"));
const blogRoter_1 = __importDefault(require("./module/blog/blogRoter"));
const commentController_1 = __importDefault(require("./module/comments/commentController"));
userRouter_1.default.use('/', userRouter_1.default);
blogRoter_1.default.use('/', blogRoter_1.default);
router.post('/comment', commentController_1.default.createComments);
exports.default = router;
