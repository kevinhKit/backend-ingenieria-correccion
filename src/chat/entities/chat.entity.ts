import { Message } from "src/message/entities/message.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('chat')
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
        (message) => message.chat,
    )
    messages?: Message[];


    @BeforeInsert()
    transforDate(datetime : Date){
        this.dateTime = datetime || new Date(+this.dateTime)
    }

    // @OneToOne(type => Chat, Chat => Chat.amigos)
    // @JoinColumn({ name: "amigo_id" })
    // amigo: Chat;
  
    // @OneToOne(type => Chat, Chat => Chat.amigo)
    // amigos: Chat;


}




