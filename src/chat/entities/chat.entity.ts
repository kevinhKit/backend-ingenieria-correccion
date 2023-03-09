import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";


@Entity('Chat')
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column("date")
    date: Date;

    @Column('smallint')
    hour: number;

    @ManyToOne(() => User, (user) => user.chats1)
    user1: User;

    @ManyToOne(() => User, (user) => user.chats2)
    user2: User;

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];






}
