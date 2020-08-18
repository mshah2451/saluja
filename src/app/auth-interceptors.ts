
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService) { }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
   
    let token='';
    this.authService.token.subscribe(val=>token=val);

    let newHeaders = request.headers;
    if (token) {
       newHeaders = newHeaders.append("Authorization", " Bearer "+ `${token}`);
    }
    const authReq = request.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}