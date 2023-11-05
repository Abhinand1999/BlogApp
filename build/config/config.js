"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.db = new sequelize_1.Sequelize(process.env.DATABASE_NAME || "", process.env.DATABASE_USERNAME || "", process.env.DATABASE_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});
exports.db.authenticate().then(() => {
    console.log('database connection successfully');
})
    .catch((err) => {
    console.log(err);
});
