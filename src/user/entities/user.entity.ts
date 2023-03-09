import { Chat } from "src/chat/entities/chat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('User')
export class User {

    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    firstname: string;

    @Column('text', {
        default: ''
    })
    secondname: string;

    @Column('text')
    firstsurname: string;

    @Column('text')
    secondsurname: string;

    @Column('text')
    address: string;

    @Column('text')
    phone: string;
    
    @Column('date')
    birthdate: string;


    @Column('text', {
        unique: true,
    },)
    dni: string;
    
    @Column('text', {
        unique: true,
        select: false
    },)
    password: string;

    @Column('text')
    email: string;
    

    


    @Column('smallint', {
        default: 0,
        select: false
    })
    resetcodepassword: string;

    @Column('smallint', {
        default: 0,
        select: false
    })
    validcode: string;

    @Column('smallint', {
        default: 0,
        select: false
    })
    isverified: string;

    @Column('smallint', {
        default: 1,
        // select: false
    })
    state: string;


    // @Column('smallint', {
    //     default: 0
    // })
    // isActive: boolean;

    
    @Column({default: () => "NOW()",
        select: false})
    date: Date;
    
    
    
    // @Column('text',{
    //     array: true,
    //     default: ['admin','moderador','usuario']
    // })
    // role: string[];


    @OneToMany(() => Chat, (chat) => chat.user1)
    chats1: Chat[];
  
    @OneToMany(() => Chat, (chat) => chat.user2)
    chats2: Chat[];
}
