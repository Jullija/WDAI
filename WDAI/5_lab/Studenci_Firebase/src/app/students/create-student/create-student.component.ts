import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  student: Student = new Student();
  submitted = false;

  constructor(private StudentService: StudentService) { }

  ngOnInit() {
  }

  newStudent(): void {
    this.student = new Student();
    this.submitted = false;
  }

  save() {
    this.StudentService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit(f: NgForm) {
    if (f.valid){
      this.submitted = true;
      this.save();
    }
  }

}
