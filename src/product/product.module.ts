import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from 'src/user/models/user.entity';

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([ProductEntity, UserEntity])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
