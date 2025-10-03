import { NestFactory } from "@nestjs/core";
import { appModule } from "./app.module";
import cookieParser from "cookie-parser";

async function start(){
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create(appModule)
    app.use(cookieParser())
    app.setGlobalPrefix('api')
    ;(await app).listen(PORT, ()=>{
        console.log(`Сервер запущен: http://localhost:${PORT}`);
    })
}
start()