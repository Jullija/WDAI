import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database'
import { first, Observable } from 'rxjs';

import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //valueChanges gdy chcę zdobyć dane, snapshotChanges gdy chcę zmienić dane

  daneRef: Observable<any[]>;

 
  constructor(private dataBase: AngularFireDatabase) {
    this.daneRef = dataBase.list('students').valueChanges();
  }

  createStudent(student: Student): void {
    const daneRef = this.dataBase.list('students');
    daneRef.push(student);
  }

  // NIE JEST NIGDZIE UŻYWANE 
  // updateStudent(student: Student) {   
  // }

  deleteStudent(student: Student) {
    let key: any;
    const daneRef = this.dataBase.list('students');
    //snapshotChanges() - obecny stan firestore. Obecny stan przepuszczam i wyszukuję pierwszego elementu, który spełnia wymagania 
    daneRef.snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().name == student.name && i.payload.val().key == student.key && i.payload.val().age == student.age) {
          key = i.payload.key;
          daneRef.remove(key);
          break;
        }
      }
    })
    
  }

  getStudentsList()  {
    this.daneRef = this.dataBase.list('students').valueChanges();
    return this.daneRef;
  }

   deleteAll() {
    const daneRef = this.dataBase.list('students');
    daneRef.remove();
   }
    
}
