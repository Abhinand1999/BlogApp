"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = require("../../config/config");
const logins = config_1.db.define('login', {
    Name: {
        type: sequelize_1.default.STRING
    },
    Email: {
        type: sequelize_1.default.STRING
    },
    roll: {
        type: sequelize_1.default.STRING
    },
    password: {
        type: sequelize_1.default.STRING
    }
}, {
    timestamps: true,
    freezeTableName: true
});
// logins.sync({force:true}) .then(() => {
//         console.log('Data connection established..............');
//       })
//       .catch((err: any) => {
//         console.log(err);
//       });
exports.default = logins;
