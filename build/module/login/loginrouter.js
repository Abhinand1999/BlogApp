"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const routerlog = express.Router();
const loginContoller_1 = __importDefault(require("../../module/login/loginContoller"));
// routeruser.use(user)
//register
routerlog.post('/Register', loginContoller_1.default.bulk);
routerlog.get('/login', loginContoller_1.default.login);
routerlog.get('/view', loginContoller_1.default.verifyjwt, loginContoller_1.default.checkuser, loginContoller_1.default.view);
exports.default = routerlog;
