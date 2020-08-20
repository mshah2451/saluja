import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../share/Utility/baseURL';
import {studentDetails} from '../model/studentDetails'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
    providedIn: 'root'
  })
  export class DashboardService implements OnDestroy {
    constructor(private http: HttpClient,private authservice:AuthService) {}

    getStudentDetails() :Observable<studentDetails> {
        let userId;
        this.authservice.userId.subscribe(x=>userId=x);
        return this.http
          .get<studentDetails>(
            `${BaseURL.baseURLAPI}GetStudentDetailsUserId?UserId=${userId}`);
    }

    ngOnDestroy() {
    
    }

  }