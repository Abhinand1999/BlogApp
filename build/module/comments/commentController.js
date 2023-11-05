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
const commentModel_1 = __importDefault(require("../comments/commentModel"));
const userModel_1 = __importDefault(require("../user/userModel"));
//create the comment
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.payload.resp.id;
        console.log(uid);
        console.log("blogid:", req.query.blog_id);
        const Comment = yield commentModel_1.default.create({
            user_id: uid,
            blog_id: req.query.blog_id,
            comment: req.body.comment,
        });
        if (!Comment) {
            console.log("comment created");
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
userModel_1.default.hasMany(blogModel_1.default, { foreignKey: 'id' });
blogModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'id' });
blogModel_1.default.hasMany(commentModel_1.default, { foreignKey: 'id' });
commentModel_1.default.belongsTo(blogModel_1.default, { foreignKey: 'id' });
userModel_1.default.hasMany(commentModel_1.default, { foreignKey: 'id' });
commentModel_1.default.belongsTo(userModel_1.default, { foreignKey: 'id' });
//list the comment
const viewcomment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);
        console.log(page);
        console.log(size);
        const list = yield commentModel_1.default.findAndCountAll({
            limit: size, order: [
                ['updatedAt', 'DESC']
            ], include: [{
                    model: userModel_1.default,
                    attributes: ['Name', 'Email',],
                }, {
                    model: blogModel_1.default,
                    attributes: ['title', 'description',]
                }],
        });
        // console.log(JSON.stringify(list, null, 2));
        // const viewOne =await blog.findAll({})
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
//delete comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.payload.resp.id;
        const Delete = yield commentModel_1.default.destroy({ where: { user_id: uid } });
        if (Delete) {
            console.log("delete succsefully");
        }
        res.status(200).json({
            message: "comment deleted",
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
exports.default = { createComments, deleteComment, viewcomment };
