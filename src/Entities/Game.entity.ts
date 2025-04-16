import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Staff } from './Staff.entity';
import { Event } from './Event.entity';
@Entity()
export class Game {

  //@PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  Game_id: number;

  @Column()
  Description: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Event, event => event.Event_id)
  Event_id: number 

}