import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { IStudent } from '../student.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList: IStudent[] = [];

  constructor(private readonly studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){

    this.studentService.getStudents().subscribe(
      res => this.studentList = res,
      err => console.log(err)
    );
  }

  deleteStudent(id: number){
    this.studentService.deleteStudent(id).subscribe(
      res => {
        this.getStudents();
      },
      err => console.log(err)
    );
  }
}
