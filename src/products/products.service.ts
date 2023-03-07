import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ){}

  async create(createProductDto: CreateProductDto) {
    
    try {

      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
      
    } catch (error) {
      this.handleDbException(error);
      
    }
  }

  findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: string) {
    
  //const product = await this.productRepository.findOneBy({ id });
    const product = await this.productRepository.findOneBy({id});
    if(!product) 
      throw new NotFoundException(`Product whit id ${id} not found`);
    
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto
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
