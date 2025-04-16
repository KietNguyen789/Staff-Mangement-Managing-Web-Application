import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, ManyToMany } from 'typeorm';
import { Staff } from './Staff.entity';

@Entity()
export class Project {

  //@PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column()
  project_name: string;

  @Column()
  project_description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Staff, staff => staff.projects)
  members: Staff[];

}