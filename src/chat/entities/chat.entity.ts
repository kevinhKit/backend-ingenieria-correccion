import { Message } from "src/message/entities/message.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Chat')
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    firstparticipan: string;

    @Column('uuid')
    secondparticipan: string;

    @Column("timestamp",{})
    dateTime: Date;

    @Column('text',{
        nullable: true,
        default: null
    })
    idProduct?: string;





    @Column('smallint',{
        default: 1
    })
    state: number;

    @Column('text',{
        default: 1
    })
    isChat: string;

    @OneToMany(
        () => Message,
        (message) => message.chats
    )
    message?: Message[];


    @BeforeInsert()
    transforDate(){
        this.dateTime = new Date(+this.dateTime)
    }





}




