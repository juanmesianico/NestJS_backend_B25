import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create_student.dto';

@Controller('student')
export class StudentController {

    constructor(private readonly studenService: StudentService){}
    
    @Get()
    async getStudents(@Res() res){
        const students = await this.studenService.getStudents();    
        return res.status(HttpStatus.OK).json({
            students: students
        });
    }

    @Post('/create')
    async createStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO ){

        const student = await this.studenService.createStudent(createStudentDTO)
        return res.status(HttpStatus.CREATED).json({
            message: 'received',
            student: student
        });
    }
}
