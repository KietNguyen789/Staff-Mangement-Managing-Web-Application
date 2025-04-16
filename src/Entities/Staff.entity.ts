import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Photo } from './Photo.entity';
import { Project } from './Project.entity';
import * as joinTableName from './JoinEntities/names'
import { join } from 'path';
@Entity()
export class Staff {
  //@PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ default: true })
  isActive: boolean;

  //how to declare relations in entity

  /////////////////relation to itself
  @ManyToOne(type => Staff, staff => staff.interships)
  @JoinColumn({name:'mentor'})
  mentor: Staff

  @OneToMany(type => Staff, staff => staff.mentor, { onDelete:'CASCADE'})
  interships: Staff[]

  ////////////////// friends Relationship at office
  @ManyToMany(()=> Staff)
  @JoinTable({name:joinTableName.JOIN_STAFF_FRIEND_TABLE_NAME})
  friends: Staff[]


  ///////////////// single Staff has multiple Photos
  @OneToMany(
    type => Photo,
    photo => photo.staff,
    {
      // all operations
      // auto delete reference records
      //cascade: true
    })
  photos: Photo[];

  ////////////////// members processing a project
  @ManyToMany(() => Project, project => project.members)
  @JoinTable({name:joinTableName.JOIN_STAFF_PROJECT_TABLE_NAME})
  projects: Project[]
}