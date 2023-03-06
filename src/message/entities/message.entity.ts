import { Chat } from "src/chat/entities/chat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('date')
    date: string;

    @Column('smallint')
    hour: number;

    @Column('smallint')
    state: string;

    @Column('smallint')
    limitstate: number;

    @Column('uuid')
    idchar: string;

    @Column('uuid')
    idperson: string;


    @OneToMany(
        () => Chat,
        (chat) => chat.message,
        // {cascade:true},
        
    )
    chats?: Chat[];





}
