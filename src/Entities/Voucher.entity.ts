import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Staff } from './Staff.entity';
import { Event } from './Event.entity';
@Entity()
export class Voucher {

  //@PrimaryGeneratedColumn()
  @PrimaryGeneratedColumn()
  Voucher_id: number;

  @Column()
  qrCode: string;

  @Column()
  Sale: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Event, event => event.Event_id)
  Event_id: number 

}