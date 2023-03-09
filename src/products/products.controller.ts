import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, 
  @Body() updateProductDto: UpdateProductDto) 
  {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id, ParseUUIDPipe') id: string) {
    return this.productsService.remove(id);
  }

  //Este método se encargará de crear una nueva entrada en 
  //la tabla ProductClick con la fecha actual y el ID del producto.
  @Post(':id/click')
  registerClick(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.registerClick(id);
  }

  @Get('most-popular')
  async findMostPopular(): Promise<Product[]> {
    return this.productsService.findMostPopularProducts();
  }
}
