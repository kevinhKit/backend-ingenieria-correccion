import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductClick } from './entities/product-click.entity';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    //inyeccion del repositorio
    @InjectRepository(ProductClick)
    private productClickRepository: Repository<ProductClick>,

  ){}

  //Con esto, cada vez que un usuario haga clic en un producto, 
  //se creará una nueva entrada en la tabla ProductClick con la 
  //fecha actual y el ID del producto correspondiente.
  async registerClick(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const click = new ProductClick();
    click.product = product;
    await this.productClickRepository.save(click);
  }
  
  //crear una consulta que une las tablas Product y ProductClick, 
  //cuenta el número de clicks que ha recibido cada producto en 
  //los últimos 30 días
  async findMostPopularProducts(): Promise<Product[]> {
    // Obtener la fecha de hace 30 días
    const date = new Date();
    date.setDate(date.getDate() - 30);
  
    // Realizar la consulta
    const queryBuilder = this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.click', 'click')
      .select('product.*')
      .addSelect('COUNT(click.id)', 'clicks')
      .where('click.date >= :date', { date })
      .groupBy('product.id')
      .orderBy('clicks', 'DESC')
      .limit(10); // Cambia este número si deseas obtener más productos
  
    return queryBuilder.getMany();
  }

  async create(createProductDto: CreateProductDto) {
    
    try {
      const { images = [], ...productDetails} = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({url:image}))
      });
      await this.productRepository.save(product);

      return { ...product, images};
      
    } catch (error) {
      this.handleDbException(error);
      
    }
  }

  findAll() {
    return this.productRepository.find({
      relations:{
        images: true,
      }  
    });
  }

  async findOne(id: string) {
    
    const product = await this.productRepository.findOneBy({id});
    if(!product) 
      throw new NotFoundException(`Product whit id ${id} not found`);
    
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
      images: [],
    });

    if( !product ) throw new NotFoundException(`Product with id: ${id} not found`);

    try {
      await this.productRepository.save(product);
      return product;  
      
    } catch (error) {
      this.handleDbException(error);
      
    }

  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  private handleDbException(error: any){
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
