"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
dotenv.config();
const DB_HOST_MASTER = process.env.DB_HOST_MASTER;
const DB_PORT_MASTER = Number(process.env.DB_PORT_MASTER);
const DB_USERNAME_MASTER = process.env.DB_USERNAME_MASTER;
const DB_PASSWORD_MASTER = process.env.DB_PASSWORD_MASTER;
const DB_DATABASE_MASTER = process.env.DB_DATABASE_MASTER;
const DB_HOST_SLAVE = process.env.DB_HOST_SLAVE;
const DB_PORT_SLAVE = Number(process.env.DB_PORT_SLAVE);
const DB_USERNAME_SLAVE = process.env.DB_USERNAME_SLAVE;
const DB_PASSWORD_SLAVE = process.env.DB_PASSWORD_SLAVE;
const DB_DATABASE_SLAVE = process.env.DB_DATABASE_SLAVE;
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    entities: [__dirname + "/../../infrastructure/entity/*{.ts,.js}"],
    migrations: [__dirname + "/../../infrastructure/migrations/*{.ts,.js}"],
    synchronize: false,
    logging: true,
    extra: {
        connectionLimit: 4,
    },
    replication: {
        master: {
            host: DB_HOST_MASTER,
            port: DB_PORT_MASTER,
            username: DB_USERNAME_MASTER,
            password: DB_PASSWORD_MASTER,
            database: DB_DATABASE_MASTER,
        },
        slaves: [
            {
                host: DB_HOST_SLAVE,
                port: DB_PORT_SLAVE,
                username: DB_USERNAME_SLAVE,
                password: DB_PASSWORD_SLAVE,
                database: DB_DATABASE_SLAVE,
            },
        ],
    },
});
