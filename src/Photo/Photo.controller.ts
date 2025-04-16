import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Query, Body, Post, UsePipes, Patch, Header, Headers, Delete,  } from "@nestjs/common";
//import  {Photo}  from "./dto/PhotoSchema.dto"
import { HttpStatus } from "@nestjs/common";
//import { MessageContextDto } from "./dto/message.dto";
import { Photo } from "../Entities/Photo.entity";
import { PhotoService } from "./Photo.service";
import { ParseIdPipe } from "src/Staff/pipes/ParseIdPipe";
import { UpdatePhotoDto } from "./dto/UpdatePhotoDto.dto";
import { HeaderDto } from "src/Staff/dto/HeadersDto.dto";
import { HeadersPipe } from "src/Staff/pipes/CustomDecorator";
import { randomInt } from "crypto";
@Controller("photo")
export class PhotoController{

    constructor(private readonly photoservice: PhotoService){
    }

    @Get("all")
    async getAllPhoto(): Promise<Photo[]>{
        const data = await this.photoservice.getAllPhoto()
        return data
        
    }
    @Get(":id")
    async getPhotoId(
    @Param('id', ParseIntPipe) id:number, 
 
    @Query('sort', ParseBoolPipe) sort:boolean
    
):Promise<Photo>{
        return await this.photoservice.findOneById(id)
    }
    
   
    @Post()
  
    
    async createPhoto(@Body() photoInfo:Photo) {
       
   
        return await this.photoservice.create(photoInfo)
    }
    @Patch(':id')
   
    async updatePhoto(
    @Param('id',ParseIdPipe ) id,
    @Body() photoInfo: UpdatePhotoDto,
    @Headers() header,
    @HeadersPipe() headerValidate: HeaderDto
    // id tren url chuyen tu string sang int
    //@Param()  param:  ParamDto,
   )
    {
        return await this.photoservice.UpdateOne(id, photoInfo)
        //photoInfo.role=header.host
       //photoInfo.name = param.name 
    }

    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIdPipe) id
    )
    {
        const photo = await this.photoservice.findOneById(id)
        await this.photoservice.DeleteOne(photo)

    }

}