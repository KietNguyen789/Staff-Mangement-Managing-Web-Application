import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Staff } from './Staff.entity';
import { Voucher } from './Voucher.entity';
import { Game } from './Game.entity';

/* Content?:
    {
        image?: string,
        title?: string,
        StartDate?: Date,
        EndDate?: Date,
        Description?: string
    } */

@Entity()
export class Event {

    //@PrimaryGeneratedColumn()
    @PrimaryGeneratedColumn()
    Event_id: number;

    @Column()
    image: string;

    @Column()
    Description: string;

    @Column()
    title: string;

    @Column()
    StartDate: Date;

    @Column()
    EndDate: Date;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(type => Voucher, voucher => voucher.Event_id)
    vouchers: Voucher[]
    //   @ManyToOne(() => Staff, staff => staff.photos, { onDelete:'CASCADE'}) // 'staff' refers to the property in Photo
    //   @JoinColumn({name: 'staff_id'})
    //   staff: Staff;
    @OneToMany(type => Game, game => game.Event_id)
    games: Game[]

}