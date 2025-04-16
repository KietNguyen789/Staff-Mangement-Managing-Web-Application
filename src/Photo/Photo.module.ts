import { Module, ValidationPipe } from "@nestjs/common";
import { PhotoController } from "./Photo.controller";
import { PhotoService } from "./Photo.service";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "../Entities/Photo.entity";
//import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
imports:[TypeOrmModule.forFeature([Photo])],
controllers: [PhotoController],
//providers:[PhotoService]
providers: [PhotoService, {
    provide:APP_PIPE,
    useValue: new ValidationPipe({
        // luoc bo prop khong duoc dinh nghia
        whitelist:true,
        // bao loi khi prop khong dinh nghia duoc truyen di 
        forbidNonWhitelisted:true,
        transform:true,
        transformOptions:
        {
            enableImplicitConversion: true,
        },
        validateCustomDecorators:true
    }),
    
}],
exports:[PhotoService]
})

export class PhotoModule{   
}