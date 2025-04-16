import { Injectable } from "@nestjs/common";
//import { PhotoDto } from "./dto/PhotoSDto.dto";
import { Photo } from "../Entities/Photo.entity";
import { Between, DataSource } from "typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePhotoDto } from "./dto/UpdatePhotoDto.dto";
import { randomInt } from "crypto";
import { Staff } from "src/Entities/Staff.entity";
@Injectable()
export class PhotoService{
    constructor(private dataSource: DataSource,@InjectRepository(Photo) private repo: Repository<Photo>){}

    async create(photo: Photo){
        return await this.repo.save(photo)
    }

    async CreateDataToTest()
    {
        const photos = []
        // begin from 1 to 10
        for (let i=0;i<10;i++)
        {
            const photo = new Photo()
            photo.photo_id=i
            photo.file_name="filename "+i
            photo.file_content="filecontent "+i
            
            // exclusive: 6
            // const staff = new Staff()
            // staff.id=randomInt(1,6)
            // photo.staff = staff
            photo.isActive=randomInt(0,2)? false : true
            photos.push(photo)
        }

        await this.repo.save(photos)
        return photos
    }

    async createMany(photos: Photo[]){
  
        photos.forEach( async photo => {
            await this.repo.save(photo)
        })
   
    }

    async getAllPhoto(): Promise<Photo[]>{
        return await this.repo.find()
    }

    async getRandomPhotoList(){
       
       
        const QueryCount = await this.repo.createQueryBuilder('Photo').select('COUNT(Photo.id)', 'count').getRawOne()
        .then((query) =>{ const end = randomInt(0,query.count); return end })
        .then((end) => { const begin =  randomInt(0,end); return[begin,end]})
        
        // .then((query) => {
        //     //const end = randomInt(0, count)
        //     // handle query.count
        // })
        
        // .finally(()=>  {})
        //  const count = await this.repo.createQueryBuilder('Staff').getCount()
       // const RepoCount = await this.repo.count()
       
       //const end = await randomInt(0,QueryCount)
       
       

        return this.repo.find({
            where:{
                photo_id: Between(QueryCount[0], QueryCount[1])
            }
        })//createQueryBuilder('Photo').select('*', 'photo').where()
    }

    async getAllPhotoWithCondition(staff_id:number): Promise<Photo[]>{
        return await this.repo.findBy({
            //staff :staff_id
            staff:{
                id:staff_id
            }
            // staff_id_role : {
            //     id:staff_id,
            // }
        })
    }
    
    async findOneById(id:number): Promise<Photo>{
        return await this.repo.findOne({
            where: {
               photo_id:id
            }     
        })
    }
    async UpdateOne(In_id:number,  dto: UpdatePhotoDto):Promise<UpdatePhotoDto>{
        await this.repo.update(In_id, dto)
        return dto
    }

    async DeleteOne(photo:Photo) {
       await this.repo.remove(photo) 
    }
   
}