"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routeruser = express.Router();
const userController_1 = __importDefault(require("../user/userController"));
//register
routeruser.post('/Register', userController_1.default.Register);
//login
routeruser.get('/login', userController_1.default.login);
exports.default = routeruser;
