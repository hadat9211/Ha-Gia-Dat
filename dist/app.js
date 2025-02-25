"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("reflect-metadata");
const configs_1 = require("./common/configs");
const router_1 = __importDefault(require("./router"));
const create_response_1 = __importDefault(require("./common/utils/create-response"));
const constants_1 = require("./common/constants");
const error_logger_1 = __importDefault(require("./middlewares/error-logger"));
const error_response_1 = __importDefault(require("./middlewares/error-response"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.disable("x-powered-by");
app.use("/assets", express_1.default.static(node_path_1.default.join(__dirname, "../assets")));
if (process.env.NODE_ENV !== constants_1.Environment.PRODUCTION) {
    app.use("/api/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(configs_1.swaggerOptions));
}
app.use((0, cookie_parser_1.default)());
// Init route
app.use("/api", router_1.default);
// Handle error
app.use(error_logger_1.default);
app.use(error_response_1.default);
app.all("*", (_req, res) => {
    res.status(constants_1.HttpStatusCode.NOT_FOUND).json((0, create_response_1.default)({
        code: constants_1.HttpStatusCode.NOT_FOUND,
        message: constants_1.NOT_FOUND_ROUTE,
    }));
});
exports.default = app;
