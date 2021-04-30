import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../share/Utility/baseURL';
import { ErrorModel } from '../Model/errorModel';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
  constructor(private http: HttpClient) {}
    logError(message: string, stack: string) {
     console.log(stack+message)
        return this.http
          .post<ErrorModel>(
            `${BaseURL.baseUrlLocalApi}errorlogger`,
            { message: message, stack: stack, returnSecureToken: true }
          )
          .pipe(
          );
      }
}