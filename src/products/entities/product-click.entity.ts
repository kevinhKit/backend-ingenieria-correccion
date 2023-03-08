import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductClick{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: () => "NOW()",
        select: false})
    date: Date;

    @ManyToOne(
        () => Product,
        (product) => product.click
    )
    product: Product;

}