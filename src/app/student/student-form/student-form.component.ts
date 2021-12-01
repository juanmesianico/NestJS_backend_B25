import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { IStudent } from '../student.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: IStudent = {
    name:'',
    code:0,
    photoURL:''
  };

  edit: boolean = false;

  constructor(private readonly studentService: StudentService, 
              private readonly route: Router,
              private readonly activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if(params['id'] != undefined){
      this.studentService.getStudentById(params['id']).subscribe(
        res => {
          this.student = res;
          this.edit = true; 
        }
      );
    }
  }

  createStudent(){
    this.studentService.createStudent(this.student).subscribe(
      res => {
        console.log(res);
        this.route.navigate(['student/list']);
      },
      
      err => console.log(err)
    );
  }

  updateStudent(){
    delete this.student.createdAt; //es para que no me cambie la fecha de creación
    this.studentService.updateStudent(this.student.id!, this.student).subscribe(
      res => {
        console.log(res);
        this.edit = false;
        this.route.navigate(['student/list']);

      },
      
      err => console.log(err)
    );
  }
}
