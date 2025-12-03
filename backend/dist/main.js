"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
async function start() {
    const PORT = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.appModule);
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const newFormExcept = errors.reduce((acc, err) => {
                acc[err.property] = err.constraints;
                return acc;
            }, {});
            return new common_1.BadRequestException({ message: newFormExcept });
        },
    }));
    (await app).listen(PORT, () => {
        console.log(`Сервер запущен: http://localhost:${PORT}`);
    });
}
start();
//# sourceMappingURL=main.js.map