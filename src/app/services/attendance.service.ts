import { Injectable } from '@angular/core';
import { studentDetails } from '../model/studentDetails';
import {DashboardService} from '../dashboard/dashboard.service';
import { BaseURL } from '../share/Utility/baseURL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor
  (
    private dashboardService:DashboardService,
    private http:HttpClient
  ) { }

  getAttendaceByStudentId(month:number,year:number): Observable<any>{
    let studentProfile:studentDetails;
    this.dashboardService.studentProfile.subscribe(x=>{
      studentProfile =x;
    });
   return this.http.get(`${BaseURL.baseURLAPI}ViewAttendaceByStudentId?admissionId=${studentProfile.AdmissionId}&month=${month}&sessionYear=${year}`)
  }
}
