import { Controller, Get, Delete, Param, ParseBoolPipe, ParseIntPipe, Query, Body, Post, UsePipes, Patch, Header, Headers,  } from "@nestjs/common";
import { StaffService } from "./Staff.service";
//import  {Staff}  from "./dto/StaffSchema.dto";
import { StaffDto } from "./dto/StaffSDto.dto";
import { ValidationPipe } from "@nestjs/common";
import { ParamDto } from "./dto/ParamDto.dto";
import { ParseIdPipe } from "./pipes/ParseIdPipe";
import { ZodValidationPipe } from "./pipes/ZodValidationPipe";
import { ZodParamSchema } from "./dto/ZodParamDto.dto";
import { StaffDtoPipe } from "./dto/ZodParamDto.dto";
import { HeadersPipe } from "./pipes/CustomDecorator";
import { HeaderDto } from "./dto/HeadersDto.dto";
import { HttpStatus } from "@nestjs/common";
//import { MessageContextDto } from "./dto/message.dto";
import { Staff } from "../Entities/Staff.entity";
import { UpdateStaffDto } from "./dto/UpdateStaffDto.dto";
import { Photo } from "src/Entities/Photo.entity";
import { PhotoService } from "src/Photo/Photo.service";

// Home Controller of Staff: Staff, Photo, Speciality

@Controller("staff")
export class StaffController{

    constructor(private readonly staffservice: StaffService, private readonly photoservice: PhotoService){
    }

    @Get("all")
    async getAllStaff(): Promise<Staff[]>{//Promise<[Staff[], number]>{
        const data = await this.staffservice.getAllStaff()
        return data//{
            // payload: {
            //     type: ['info'],
            //     status: HttpStatus.OK,
            //     data: data ? data : "No data"
            // }
       // }
    }
    @Get('RandomStaff')
    async getRandomStaff(){
        return await this.staffservice.findOneRandomStaff()
    }
    @Get("getPhotos")
    async GetPhotoOfStaffWithStaffId(
      //  @Param('id', ParseIntPipe) id,
        @Query('id', ParseIdPipe) id: number //, sure: boolean  
    ):Promise<Photo[]>
    {
        return  (await this.staffservice.findPhotosWithStaffId(id)).photos
    }
    @Get(":id")
    async getStaffId(
    @Param('id', ParseIntPipe) id:number, 
    // mandatory input variable, how to set it to optional ??????
    @Query('sort', ParseBoolPipe) sort:boolean
    
):Promise<Staff>{
        return await this.staffservice.findOneById(id)//`${id} SortQuery ${sort}` 
    }
    @Post("SomePhotoToTest")

    async createSomePhotos(
    )
    {
       return await this.photoservice.CreateDataToTest()
    }
    @Post("SomeStaffToTest")

    async createSomeStaffs(
    //@Body() staffs: Staff[]
    )
    {
       return await this.staffservice.createToTest()
    }
    @Post()
    //whitelist luoc bo thuoc tinh khong co trong schema, 
    //forbidNonWhitelisted luon di sau whitelist. raise error khi gui thuoc tinh khong co trong entity
    
//    @UsePipes(new ValidationPipe({
// //    whitelist:true, 
// //     forbidNonWhitelisted:true,
//     //always:true,
//     groups:["create"],
// }))

    // GHI TRONG METHOD UU TIEN GLOBAL
    @UsePipes(new ZodValidationPipe(ZodParamSchema))
    // new ValidationPipe({whitelist:true,forbidNonWhitelisted:true})
    // return similar datatype
    async createStaff(@Body() staffInfo:Staff) {
       
        //var NewStaff =  new StaffDto(staffInfo._id,staffInfo.name,staffInfo.role, staffInfo.method)
        //staffInfo.method+=" create"
        //return staffInfo
        return await this.staffservice.create(staffInfo)
    }
    @Patch(':id')
    // @UsePipes(new ValidationPipe({
    //     //whitelist:true, 
    //     //forbidNonWhitelisted:true,
    //     groups:["update"],
    //     //always:true,
    //     // transform:true,
    //     // transformOptions:
    //     // {
    //     //     enableImplicitConversion: true,
    //     // }
        
    // }))
    async updateStaff(
    @Param('id',ParseIdPipe ) id,
    @Body() staffInfo: UpdateStaffDto,
    @Headers() header,
    //@HeadersPipe() headerValidate: HeaderDto
    // id tren url chuyen tu string sang int
    //@Param()  param:  ParamDto,
   )
    {
        return await this.staffservice.UpdateOne(id, staffInfo)
        //staffInfo.role=header.host
       //staffInfo.name = param.name 
    }

   @Delete(':id')
   async DeleteOneById
   (
    @Param('id', ParseIdPipe) id
   )
   {
        return await this.staffservice.RemoveStaff(id)
   }
}