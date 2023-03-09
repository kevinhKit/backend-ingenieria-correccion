import { Chat } from "src/chat/entities/chat.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @Column('timestamp')
    dateTime: Date;

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
        (chat) => chat.messages,
        // {cascade:true},
    )
    chat: Chat;

    @Column('uuid',{
        nullable: true,
        default: null
    })
    @OneToOne(
        () => Message
    )
    @JoinTable()
    idPreviousMessage: string;

    @BeforeInsert()
    transforDate(){
        this.dateTime = new Date(+this.dateTime)
    }




}