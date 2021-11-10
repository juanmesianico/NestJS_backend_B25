import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {

    private studentList: string[] = ["Carlos", "Ana", "Juan"];

    getLastStudent():string[]{
        return this.studentList;
    }
}
