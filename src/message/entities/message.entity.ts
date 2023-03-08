import { Chat } from "src/chat/entities/chat.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('timestamp')
    dateTime: string;

    // @Column('smallint',{
    //     default: 1
    // })
    // hour: number;

    @Column('smallint',{
        default: 1
    })
    state: string;

    @Column('smallint',{
        default: 0
    })
    limitstate: number;

    // @Column('uuid')
    // idchat: string;

    @Column('uuid')
    idEmisor: string;


    @ManyToOne(
        () => Chat,
        (chat) => chat.message,
        // {cascade:true},
        
    )
    chats: Chat;

    @Column('uuid',{
        nullable: true,
        default: null
    })
    idPreviousMessage: string;



}