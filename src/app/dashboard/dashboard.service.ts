import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../share/Utility/baseURL';
import {studentDetails} from '../model/studentDetails'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { async } from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService implements OnDestroy {
    constructor(private http: HttpClient,private authservice:AuthService) {}

    private student = new BehaviorSubject<studentDetails>(null);

    getStudentDetails() :Observable<studentDetails> {
        let userId;
        this.authservice.userId.subscribe(x=>userId=x);
        return this.http
          .get<studentDetails>(
            `${BaseURL.baseURLAPI}GetStudentDetailsUserId?UserId=${userId}`)
            .pipe(tap(this.setStudentData.bind(this)));
    }

    
  private setStudentData(student: studentDetails) {
    this.student.next(student);
    this.storeStudentData(
      student
    );
  }

  private storeStudentData(
    student : studentDetails
  ) {
    const data = JSON.stringify(student);
    Plugins.Storage.set({ key: 'studentProfile', value: data });
  }

  ngOnDestroy() {
  
  }
    
  get studentProfile() {
    return this.student.asObservable().pipe(
      map(student => {
        if (student) {
          return student;
        } else {
          return null;
        }
      })
    );
  }

  }