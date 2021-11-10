import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studenService: StudentService){}
    
    @Get()
    getStudent():string[]{
        return this.studenService.getLastStudent();
    }

    @Post('/create')
    createStudent(@Res() res): any{
        return res.status(HttpStatus.OK).json({message: 'received'});
    }
}
