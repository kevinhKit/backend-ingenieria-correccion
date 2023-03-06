import { Message } from "src/message/entities/message.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Chat')
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    firstparticipan: string;

    @Column('uuid')
    secondparticipan: string;

    @Column("date")
    date: Date;

    @Column('smallint')
    hour: number;

    @Column('smallint')
    state: number;


    @ManyToOne(
        () => Message,
        (message) => message.chats
    )
    message: Message;





}
