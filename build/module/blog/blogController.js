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
const blogModel_1 = __importDefault(require("../blog/blogModel"));
const userModel_1 = __importDefault(require("../user/userModel"));
const sequelize_1 = require("sequelize");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//image uplode
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage }).single("file");
//create blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let Blog = yield blogModel_1.default.create({
            user_id: req.payload.resp.id,
            title: req.body.title,
            description: req.body.description,
            image: req.file.filename
        });
        if (!Blog) {
            console.log("blognot created");
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
//join  table
userModel_1.default.hasMany(blogModel_1.default, { foreignKey: 'id' });
blogModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'id' });
//viewUser blog
const ViewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    console.log(page);
    console.log(size);
    const list = yield blogModel_1.default.findAll({
        limit: size, offset: page * size, order: [
            ['updatedAt', 'DESC']
        ], include: [{
                model: userModel_1.default,
                attributes: ['id', 'Name', 'Email',]
            }]
    });
    // console.log(JSON.stringify(list, null, 2));
    // const viewOne =await blog.findAll({})
    res.status(500).json({ list });
});
//delete the blog
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usid = req.payload.resp.id;
        const Delete = yield blogModel_1.default.destroy({ where: { user_id: usid } });
        console.log(Delete);
        if (!Delete) {
            console.log("file not deleted");
        }
        res.status(200).json({
            message: "blog Deleted....",
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
//updateblog
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.payload.resp.id;
        const body = req.body;
        if (body.title) {
            let Update = yield blogModel_1.default.update({ title: body.title }, { where: { id: user_id } });
            if (!Update) {
                console.log("file not Update");
            }
            res.status(200).json({
                message: "blog title Updated....",
                status: "Success"
            });
        }
        if (body.description) {
            let Update = yield blogModel_1.default.update({ description: body.description }, { where: { id: user_id } });
            if (!Update) {
                console.log("file not Update");
            }
            res.status(200).json({
                message: "blog description Updated....",
                status: "Success"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: false,
            message: error
        });
    }
});
//bulk create 
const bulk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const Bulk = yield blogModel_1.default.bulkCreate(body);
    res.status(500).json({ message: "successfully created", Bulk });
});
const Upsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usid = req.payload.resp.id;
        const [result, created] = yield blogModel_1.default.upsert({
            user_id: usid,
            title: req.body.title,
            description: req.body.description
        });
        if (result) {
            res.status(500).json({ result });
            console.log("succssfully added");
        }
        if (created) {
            res.status(500).json({ created });
        }
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: false,
            message: error
        });
    }
});
//in 
const ViewUserin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.body.id;
        const list = yield blogModel_1.default.findAll({
            where: { id: { [sequelize_1.Op.in]: id } }, attributes: ["id", "title"]
        });
        res.status(500).json({ list });
    }
    catch (error) {
        console.log(error);
        res.status(200).json({
            status: false,
            message: error
        });
    }
});
exports.default = { createBlog, ViewUser, upload, deleteBlog, updateBlog, Upsert, bulk, ViewUserin };
