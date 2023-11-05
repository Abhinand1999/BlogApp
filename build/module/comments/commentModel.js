"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/config");
const sequelize_1 = __importDefault(require("sequelize"));
const comment = config_1.db.define('comment', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, user_id: {
        type: sequelize_1.default.INTEGER,
    },
    blog_id: {
        type: sequelize_1.default.INTEGER,
    },
    comment: {
        type: sequelize_1.default.STRING
    }
}, {
    timestamps: true
});
config_1.db.sync()
    .then(() => {
    console.log('Data connection established');
})
    .catch((err) => {
    console.log(err);
});
exports.default = comment;
