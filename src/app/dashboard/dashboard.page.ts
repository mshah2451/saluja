import { Component, OnInit, AfterViewInit, OnDestroy,HostListener  } from '@angular/core';
import {studentDetails} from '../model/studentDetails'
import {DashboardService} from './dashboard.service';
import { LoaderService } from '../services/loader.service';
import { Platform, AlertController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// import { BackButtonService } from '../services/backbutton.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit,OnDestroy  {
  backButtonSubscription;
  isLoading:boolean=false;
  studentDetail:studentDetails;
  constructor(private dashboardService:DashboardService,  
       private router: Router,
        public alertCtrl: AlertController,
        private loaderService:LoaderService,
        private platform: Platform,
        private _location: Location,
        private routerOutlet: IonRouterOutlet

      ) { 
  
  }

  ngOnInit() {
    this.loaderService.showLoader();
    this.dashboardService.getStudentDetails().subscribe(studentDetail=>{
      this.studentDetail=studentDetail;
      this.loaderService.hideLoader();               
    });
   
    
  }
  ionViewWillEnter() {
    // this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(666666, () => {
    //   if(this.router.url === '/dashboard'){
    //   this.LogOutAlert();
    //    }
    //    else{
    //     this._location.back();
    //    }
    //  });
  }
  ionViewWillLeave(){
    if(this.router.url === '/dashboard'){
        this.LogOutAlert();
         }
  //  this.backButtonSubscription.unsubscribe(); 
   }
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
