import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StudentModule],
})
export class AppModule {}
