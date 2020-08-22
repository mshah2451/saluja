import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Observable } from "rxjs/Observable";
import { AuthService } from '../auth/auth.service';
import { BaseURL } from '../share/Utility/baseURL';
import { HomeworkUploadDetails } from './Homework';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService implements OnDestroy {

    constructor(private http: HttpClient,private authService:AuthService) {}
  
 
  getHomeWorkById(): Observable<any> {
    let userId;
     this.authService.userId.subscribe(x=>userId=x);
    const url = `${BaseURL.baseURLAPI}/ViewStudentAssignment?UserId=${userId}`;
    return this.http.get<any>(url).pipe(
    
    );
  }

  
  UploadHomeworkDetail(homeworkUploadDetails:HomeworkUploadDetails): Observable<any> {
    //const userId = this.authService.userId;
    const userId=this.authService.userId;
    const url = `${BaseURL.baseURLAPI}StudentUploadHW`;
    // this.http.post<any>(url,JSON.stringify(homeworkUploadDetails));

    
     return this.http
     .post<any>(
       `${BaseURL.baseURLAPI}StudentUploadHW`,
       {  enrollmentCode:homeworkUploadDetails.enrollmentCode,
        classid: homeworkUploadDetails.classid,
       sectionId:homeworkUploadDetails.sectionId,
       subjectId: homeworkUploadDetails.subjectId,
       uploadedby: homeworkUploadDetails.uploadedby,
       deadlineDate: null,
       uploadeOn: null,
       filepath: homeworkUploadDetails.filepath,
       FileName: homeworkUploadDetails.FileName,
       AssId: homeworkUploadDetails.AssId,
       Remark:homeworkUploadDetails.Remark 
         }
     )
  .pipe();
  }
  
  ngOnDestroy() {
   
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}
