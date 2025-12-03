"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const common_1 = require("@nestjs/common");
const image_service_1 = require("./image.service");
const image_controller_1 = require("./image.controller");
const sequelize_1 = require("@nestjs/sequelize");
const image_model_1 = require("../../model/users/image.model");
const users_model_1 = require("../../model/users/users.model");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    (0, common_1.Module)({
        controllers: [image_controller_1.ImageController],
        providers: [image_service_1.ImageService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([image_model_1.Images, users_model_1.User]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './public',
                    filename: (req, file, cb) => {
                        const typeImage = file.originalname.split('.')[1];
                        const origName = file.originalname.split('.')[0];
                        const nameImage = Date.now() + '-' + origName + '.' + typeImage;
                        cb(null, nameImage);
                    },
                }),
            }),
        ],
        exports: [image_service_1.ImageService],
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map