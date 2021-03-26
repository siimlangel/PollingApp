import {Entity, PrimaryGeneratedColumn, Column, Generated, PrimaryColumn, OneToMany} from "typeorm";
import { Poll } from "./Poll";

@Entity()
export class User {

    @PrimaryColumn()
    @Generated("uuid")
    uuid: string;

    @Column({unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @OneToMany(() => Poll, poll => poll.user)
    polls: Poll[];

}
