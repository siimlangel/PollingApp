import {Entity, Column, Generated, ManyToMany, JoinTable, OneToMany, PrimaryColumn, ManyToOne} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";

@Entity()
export class Poll {

    @PrimaryColumn()
    @Generated("uuid")
    uuid: string;
   
    @Column()
    title: string;

    @Column()
    description: string;
   
    @OneToMany(() => Answer, answer => answer.poll)
    answers: Answer[];

    @ManyToOne(() => User, user => user.polls)
    user: User;

}
