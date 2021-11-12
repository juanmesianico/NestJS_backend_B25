import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
