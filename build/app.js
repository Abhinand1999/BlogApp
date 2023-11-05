"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./module/user/userRouter"));
const blogRoter_1 = __importDefault(require("./module/blog/blogRoter"));
const commentRouter_1 = __importDefault(require("./module/comments/commentRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const loginrouter_1 = __importDefault(require("./module/login/loginrouter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('hello');
});
app.use('/user', userRouter_1.default);
app.use('/blog', blogRoter_1.default);
app.use('/image', express_1.default.static('./upload'));
app.use('/comment', commentRouter_1.default);
app.use('/login', loginrouter_1.default);
//app.use("/uploads", express.static('./uploads'));
app.listen(port, () => {
    console.log("connect succsfully", { port });
});
