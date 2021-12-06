import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    StudentModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bimcfk94s6ftyivuoape-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uyiy2hv5jhegvhws',
      password: 'AS5s1ug7gnYJpKMS8OlE',
      database: 'bimcfk94s6ftyivuoape',
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule,
    ProductModule
  ],
})
export class AppModule {}
