import { setSeederFactory } from 'typeorm-extension';
import { Photo } from 'src/Entities/Photo.entity';
import { Faker } from '@faker-js/faker'; // Import Faker properly
import { StaffService } from 'src/Staff/Staff.service';
import { getRepositoryToken } from '@nestjs/typeorm';

export const StaffFactory = setSeederFactory(Photo, async (faker, staffservice:StaffService) => {

    const photo = new Photo();

    photo.file_name = faker.image.url();
    photo.file_content = faker.lorem.sentence(); 
    photo.isActive = faker.datatype.boolean(); 
    

    // const staff = await staffservice.findOneRandomStaff()

    // if (staff) {
    // photo.staff = staff;
    // }
    // photo.staff = staff
  
    return photo;
});
