import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    idProductCategory: string

    @Column('text')
    name: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column('numeric', {
        default: 0
    })
    price: number;

    @Column({default: () => "NOW()",
        select: false})
    date: Date;
    
    @Column('text')
    state: string; 

    @Column('text')
    idPerson: string; 

    @Column('text')
    department:string;

    @Column('int', {
        default: 0
    })
    stock:number;

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager:true}
    )
    images?: ProductImage[];

}
