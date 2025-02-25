"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIGS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.APP_CONFIGS = {
    NODE_ENV: process.env.NODE_ENV,
    ROLE_ADMIN: process.env.ROLE_ADMIN,
    ROLE_OFFICIAL: process.env.ROLE_OFFICIAL,
    ROLE_GAMETEAM_EDITOR: process.env.ROLE_GAMETEAM_EDITOR,
    ROLE_ANALYST_EDITOR: process.env.ROLE_ANALYST_EDITOR,
    ROLE_ANALYST_MANAGER: process.env.ROLE_ANALYST_MANAGER,
};
