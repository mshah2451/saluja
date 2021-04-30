import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
           console.log("getClientErrorMessage")
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?    
           error.message :
           'No Internet Connection';
  }    
}