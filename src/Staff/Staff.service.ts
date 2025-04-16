import { Injectable, ParseBoolPipe } from "@nestjs/common";
//import { StaffDto } from "./dto/StaffSDto.dto";
import { Staff } from "../Entities/Staff.entity";
import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateStaffDto } from "./dto/UpdateStaffDto.dto";
import { PhotoModule } from "src/Photo/Photo.module";
import { Photo } from "src/Entities/Photo.entity";
import { PhotoService } from "src/Photo/Photo.service";
import { randomInt } from "crypto";
import { QueryRunner } from "typeorm";

@Injectable()
export class StaffService{
    private exportRepo: Repository<Staff>
    constructor(private dataSource: DataSource, private photoservice: PhotoService,@InjectRepository(Staff) private repo: Repository<Staff>)
    {
        
        this.createToTest()
        photoservice.CreateDataToTest()
        if(!this.exportRepo)
        {
            this.exportRepo = this.repo
        }
        
    }

    async create(staff: Staff){
        return await this.repo.save(staff)
    }

    async createMany(staffs: Staff[]){
    //await this.dataSource.transaction(async manager => {
        staffs.forEach( async staff => {
            await this.repo.save(staff)
        })
   // })
        return staffs
    }

    async createToTest(){
        const staffs = []
        // begin from 1 to 10
        for (let i=0;i<10;i++)
        {
            const staff = new Staff()
            staff.id =i
            staff.name="name "+i
            staff.role="role "+i
            staff.isActive= randomInt(0,2) ? false : true
            
            staffs.push(staff)

        }

        await this.repo.save(staffs)
        return staffs
    }

    async getAllStaff(): Promise<Staff[]>{
        return await this.repo.find()
    }

  
    async findOneById(id:number): Promise<Staff>{
        return await this.repo.findOne({
            where: {
                id:id
            }     
        })
    }
    async findPhotosWithStaffId(Staff_id:number){
        const PhotoList = await this.photoservice.getAllPhotoWithCondition(Staff_id)
        
        const staff = await this.repo.findOne({
            where:{
                id: Staff_id
            }
        })

        ////////////////////////////////////// save in database

        staff.photos=PhotoList
        // const StaffWithPhoto = await this.repo.findOne({
        //     where:{

        //         id:Staff_id

        //     },
        //     // nhu vay chi goi duoc o service
        //     relations:{
        //         photos: true
        //     }
        // }) 
        return staff
    }
    async findOneRandomStaff()
    {
        return await this.repo.createQueryBuilder('Staff')
        //.select('Staff.id')
        .getOne()
    }
    async UpdateOne(In_id:number,  dto: UpdateStaffDto):Promise<UpdateStaffDto>{
        await this.repo.update(In_id, dto)
        return dto
    }

  
    async RemoveStaff(id:number)
    {
        const Deletedstaff = await this.repo.findOne(
            {
                where:{
                    id
                }
            }
        ) 
        return await this.repo.delete(Deletedstaff)
       
    }
}