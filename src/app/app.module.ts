import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {FileTransfer} from '@ionic-native/file-transfer/ngx'
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { AuthInterceptor } from './auth-interceptors';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';
import { GlobalErrorHandler } from './errorhandler/global-error-handler.service';
import { ServerErrorInterceptor } from './errorhandler/server-error.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(),
     AppRoutingModule, 
     NgCalendarModule,
     ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    FileTransfer,
    FileChooser,
    FilePath,
    Camera,
    File,  
    Downloader,
    SplashScreen,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass: ServerErrorInterceptor,multi:true}

  ],
 
  bootstrap: [AppComponent]
})
export class AppModule {}
