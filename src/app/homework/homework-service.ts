import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Observable } from "rxjs/Observable";
import { AuthService } from '../auth/auth.service';
import { BaseURL } from '../share/Utility/baseURL';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService implements OnDestroy {

    constructor(private http: HttpClient,private authService:AuthService) {}
  
 
  getHomeWorkById(): Observable<any> {
    //const userId = this.authService.userId;
    const userId='6005177895';
    const url = `${BaseURL.baseURLAPI}ViewAssignmentbyStudent?UserId=${userId}`;
    return this.http.get<any>(url).pipe(
    
    );
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
