import { Module, ValidationPipe } from "@nestjs/common";
import { StaffController } from "./Staff.controller";
import { StaffService } from "./Staff.service";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Staff } from "../Entities/Staff.entity";
import { PhotoService } from "src/Photo/Photo.service";
import { Repository } from "typeorm";
import { Photo } from "src/Entities/Photo.entity";
import { PhotoModule } from "src/Photo/Photo.module";
//import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
imports:[TypeOrmModule.forFeature([Staff]), PhotoModule],
controllers: [StaffController ],
//providers:[StaffService]
providers: [StaffService, {
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
exports:[StaffService]
})

export class StaffModule{
    
}