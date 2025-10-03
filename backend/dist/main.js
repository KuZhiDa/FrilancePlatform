"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.appModule);
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix('api');
    (await app).listen(PORT, () => {
        console.log(`Сервер запущен: http://localhost:${PORT}`);
    });
}
start();
//# sourceMappingURL=main.js.map