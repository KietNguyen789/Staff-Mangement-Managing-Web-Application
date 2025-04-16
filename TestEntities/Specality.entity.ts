import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
//import { Photo } from './Photo.entity';
//import { Staff } from './Staff.entity';
@Entity()
export class Specality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lable: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  Speciality_Staff_id:number

  //how to declare relations in entity
  
  // @OneToOne(type => Staff, staff => staff.id)
  // staff: number;
}