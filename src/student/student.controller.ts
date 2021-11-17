import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create_student.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService){}
    
    @Get()
    @UseGuards(AuthGuard())
    async getStudents(@Res() res){
        const students = await this.studentService.getStudents();    
        return res.status(HttpStatus.OK).json({
            data: students
        });
    }

    @Get('/:studentId')
    async getStudent(@Res() res, @Param('studentId') id){
        const student = await this.studentService.getStudentById(id);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Found',
            data: student
        });
    }

    @Post('/create')
    async createStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO ){

        const student = await this.studentService.createStudent(createStudentDTO)

        if(student.code){
            throw new Error('Student already exists');
        }

        return res.status(HttpStatus.CREATED).json({
            message: 'received',
            data: student
        });
    }

    @Put('/update/:studentId')
    async updateStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO, @Param('studentId') id){
        const student = await this.studentService.updateStudent(id, createStudentDTO);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Student updated',
            data: student
        });
    }

    @Delete('/delete')
    async deleteStudent(@Res() res, @Query('studentId') id){
        const student = await this.studentService.deleteStudentById(id);
        
        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message: 'Deleted',
            data: student
        });
    }
}
