import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    StudentModule, 
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.bbu9b.mongodb.net/db_gr_25',{
      useNewUrlParser: true
    }), 
    ProductModule
  ],
})
export class AppModule {}
