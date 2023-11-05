"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
// import * as sequelize from sequelize
const config_1 = require("../../config/config"); // Adjust the path according to your project structure
const blog = config_1.db.define('blog', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.default.INTEGER,
    },
    title: {
        type: sequelize_1.default.STRING
    },
    description: {
        type: sequelize_1.default.STRING
    },
    image: {
        type: sequelize_1.default.BLOB
    },
}, {
    timestamps: true
});
// Sync the model
// db.sync()
//     .then(() => {
//         console.log('Data connection established');
//     })
//     .catch((err: any) => {
//         console.log(err);
//     });
exports.default = blog;
