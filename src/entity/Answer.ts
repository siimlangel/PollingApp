import { Column, Entity, Generated, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Poll } from "./Poll";


@Entity()
export class Answer {

    @PrimaryColumn()
    @Generated("uuid")
    uuid: string;

    @Column()
    text: string;

    @Column({type: "integer", default: 0})
    votes: number;

    @ManyToOne(() => Poll, poll => poll.answers, {
        cascade: ["update", "remove"]
    })
    poll: Poll;



}