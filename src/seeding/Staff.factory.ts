import { setSeederFactory } from 'typeorm-extension';
import { Staff } from 'src/Entities/Staff.entity';
import { Faker } from '@faker-js/faker'; // Import Faker properly
import { PhotoService } from 'src/Photo/Photo.service';


export const StaffFactory = setSeederFactory(Staff, (faker, photoservice: PhotoService) => {
    const staff = new Staff();
    
    // Use the correct faker methods
    staff.name = faker.person.fullName(); // Generate a full name
    staff.role = faker.person.jobTitle(); // Generate a job title
    staff.isActive = faker.datatype.boolean(); // Generate a boolean for isActive
    //photoservice.getRandomPhotoList().then((PhotoList) => {staff.photos= PhotoList})
    

    //staff.friends= faker.



    return staff;
});
