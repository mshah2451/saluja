import { Component, OnInit, AfterViewInit, OnDestroy,HostListener  } from '@angular/core';
import {studentDetails} from '../model/studentDetails'
import {DashboardService} from './dashboard.service';
import { LoaderService } from '../services/loader.service';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BackButtonService } from '../services/backbutton.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit,OnDestroy,AfterViewInit  {
  
  isLoading:boolean=false;
  studentDetail:studentDetails;
  constructor(private dashboardService:DashboardService,  
       private router: Router,
        public alertCtrl: AlertController,
        private loaderService:LoaderService,
        private platform: Platform,
        private backButtonService:BackButtonService) { 
     this.backButtonService.backNavDetech();
  }

  ngOnInit() {
    this.loaderService.showLoader();
    this.dashboardService.getStudentDetails().subscribe(studentDetail=>{
      this.studentDetail=studentDetail;
      this.loaderService.hideLoader();               
    });
   
    
  }
  ngAfterViewInit() {
  
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    //this.backButtonSubscription.unsubscribe();
  }
  async LogOutAlert(){
    const alertTest = await this.alertCtrl.create({  
      header: 'Do you want to logout.',  
      buttons: [ { 
        text: 'Yes',  
        handler:async data => {  
          this.router.navigateByUrl('/auth');
        }   
      }, {
        text: 'No',  
        handler: data => {  
         this.router.navigateByUrl('/dashboard');
          return;
        }  
      } ]  
    }); 
    await alertTest.present(); 
  }
}
