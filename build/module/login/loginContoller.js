"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginmodule_1 = __importDefault(require("./../login/loginmodule"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//registration
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwd = req.body.password;
        if (!passwd) {
            throw new Error("Please Enter Password");
        }
        const hashpassword = yield bcrypt_1.default.hash(passwd, 10);
        let login = yield loginmodule_1.default.create({
            Name: req.body.Name,
            Email: req.body.Email,
            roll: req.body.roll,
            password: hashpassword
        });
        if (!login.Email) {
            throw new Error("Please Enter Email");
        }
        if (!login.Name) {
            throw new Error("Please Enter Name");
        }
        res.status(200).json({
            message: "User created",
            status: "Success"
        });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: false,
            message: error
        });
    }
});
const bulk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const Bulk = yield loginmodule_1.default.bulkCreate(body);
    res.status(500).json({ message: "successfully created", Bulk });
});
///login
// tocken verification
function verifyjwt(req, res, next) {
    try {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(500).send({ error: "no tocken provided" });
        }
        let tocken = authHeader.split(" ")[1];
        const decodedToken = jsonwebtoken_1.default.verify(tocken, "secret", (err, decode) => {
            if (err) {
                res.status(500).send({ error: "Authentication failed" });
                console.log(decode);
            }
            else {
                req.payload = decode;
                next();
            }
        });
    }
    catch (err) {
        res.send(500).send({ err: "failed" });
    }
}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Email = req.body.Email;
        let userpassword = req.body.password;
        let user = yield loginmodule_1.default.findOne({
            where: { Email: { [sequelize_1.Op.eq]: Email } }
        });
        // console.log(user.password)
        // console.log(user.Email)
        if (!user) {
            return res.status(200).json({ massage: 'invalid user' });
        }
        if (!userpassword) {
            return res.status(401).json({ message: 'Invalid password.' });
        }
        //tocken generation
        let resp = {
            id: user.id,
            roll: user.roll
        };
        console.log(resp, "%%%%%%%%%%%%%%%");
        let tocken = jsonwebtoken_1.default.sign({ resp }, "secret", { expiresIn: '3000m' });
        res.json({ message: 'Login successesfully', tocken: tocken });
        // res.json({ message: 'Login successesfully' })
    }
    catch (error) {
        console.log('error during login', error);
        res.status(500).json({ message: 'sever error' });
    }
});
// token type veification
const view = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roll = req.payload.resp.roll;
    const id = req.payload.resp.id;
    console.log(roll, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    if (roll == 'admin') {
        const view = yield loginmodule_1.default.findAll({ where: { roll: { [sequelize_1.Op.in]: ["admin", "user"] } } });
        res.status(500).json({ view });
    }
    if (roll == 'user') {
        const view = yield loginmodule_1.default.findAll({ where: { roll: { [sequelize_1.Op.in]: ["user"] } } });
        res.status(500).json({ view });
    }
    if (roll == "superadmin") {
        const view = yield loginmodule_1.default.findAll();
        res.status(500).json({ view });
    }
});
function checkuser(accessKey) {
    return (req, res, next) => {
        const roll = req.payload.resp.roll;
        if (!accessKey.includes(roll)) {
            res.status(401).send({ message: "unauthorized access" });
        }
        else {
            next();
        }
    };
}
exports.default = { Register, bulk, login, verifyjwt, view, checkuser };
