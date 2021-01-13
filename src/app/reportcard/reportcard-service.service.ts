import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BaseURL } from '../share/Utility/baseURL';
import { DashboardService } from '../dashboard/dashboard.service';
import { studentDetails } from '../model/studentDetails';
import { DowloadResultCard } from '../Model/DowloadResultCard';
@Injectable({
  providedIn: 'root'
})
export class ReportcardServiceService {

  constructor(private http: HttpClient,private authService:AuthService,  private dashboarService:DashboardService,) {}
  
 
  getReportCardtype(): Observable<any> {
    let studentProfile:studentDetails;
    this.dashboarService.studentProfile.subscribe(x=>{
      studentProfile =x;
    });
    let classId=studentProfile.ClassId;
    const url = `${BaseURL.baseUrlLocalApi}/ResultTypeMaster?classId=${classId}`;
    return this.http.get<any>(url).pipe(
    
    );
  }
  DownloadReportCardtype(download:DowloadResultCard): Observable<any> {
    let studentProfile:studentDetails;
    this.dashboarService.studentProfile.subscribe(x=>{
      studentProfile =x;
    });
    download.admissionid=studentProfile.AdmissionId;
    const url = `${BaseURL.baseUrlLocalApi}/DownloadResults?resultype=${download.resultType}&sessionValue=${download.sessionId}&admissionid=${download.admissionid}&levelid=${download.levelid}`;
    return this.http.get<any>(url).pipe(
    
    );
  }


}
