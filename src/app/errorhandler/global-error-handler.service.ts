import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import {  LoggingService } from '../services/logging.service';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    console.log("handleError")
    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
    //  notifier.showError(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
    //  notifier.showError(message);
    }
    // Always log errors
    logger.logError(message, stackTrace).subscribe(x=>{
      alert("Report Card Is  Available!! ")
    },err=>{
      alert("Report Card Is Not Available!! ")
    });;
    console.log(error);
  }
}