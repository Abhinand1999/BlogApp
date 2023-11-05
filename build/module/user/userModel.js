"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
// import * as sequelize from sequelize
const config_1 = require("../../config/config"); // Adjust the path according to your project structure
const User = config_1.db.define('user', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // image:{
    //   type:sequelize.BLOB
    // },
    Name: {
        type: sequelize_1.default.STRING // Use the appropriate data type for the name field
    },
    Email: {
        type: sequelize_1.default.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.default.STRING,
    }
}, {
    timestamps: true
});
// User.sync({ alter: true })
// Sync the model
// db.sync()
//   .then(() => {
//     console.log('Data connection established');
//   })
//   .catch((err: any) => {
//     console.log(err);
//   });
exports.default = User;
