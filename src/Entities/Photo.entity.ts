import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Staff } from './Staff.entity';

@Entity()
export class Photo {

  //@PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column()
  file_name: string;

  @Column()
  file_content: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Staff, staff => staff.photos, { onDelete:'CASCADE'}) // 'staff' refers to the property in Photo
  @JoinColumn({name: 'staff_id'})
  staff: Staff;

}