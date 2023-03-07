import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  ){}

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
