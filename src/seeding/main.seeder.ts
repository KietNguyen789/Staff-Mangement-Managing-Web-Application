import { Staff } from "src/Entities/Staff.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker, Faker } from "@faker-js/faker/.";
import { Project } from "src/Entities/Project.entity";
import { Photo } from "src/Entities/Photo.entity";
export class MainSeeder implements Seeder {
    public async run(datasource: DataSource, factorymanager: SeederFactoryManager):Promise<any>
    {
       
        const staff_factory =  factorymanager.get(Staff)
        const project_factory = factorymanager.get(Project)
        const photo_factory = factorymanager.get(Photo)
        const projects = await project_factory.saveMany(5)
        const photos = await photo_factory.saveMany(30)
        const users = await staff_factory.saveMany(15)
        // const users = await staff_factory.saveMany(15).then(users =>{
        //     // await Promise.all(
        //     users.map( async () => {
        //        const user = await staff_factory.make({
        //             friends: faker.helpers.arrayElement(users).friends,
        //             interships: faker.helpers.arrayElement(users).interships,
        //             mentor: await staff_factory.save()

        //     })
        //     // )
        //     return user 
        //   })
        // })

        users.map(async () => {
            const user = await staff_factory.make({
                 friends: faker.helpers.arrayElement(users).friends,
                 interships: faker.helpers.arrayElement(users).interships,
                 mentor: await staff_factory.save(),
                // photos: faker.helpers.arrayElement(photos),


         })
         return user


    })

}
}