import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {studentDetails} from '../model/studentDetails'
import {DashboardService} from './dashboard.service';
import { LoaderService } from '../services/loader.service';
import { Platform, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit,OnDestroy,AfterViewInit  {
  backButtonSubscription;
  isLoading:boolean=false;
  studentDetail:studentDetails;
  constructor(private dashboardService:DashboardService,  private activatedRoute : ActivatedRoute,   private router: Router, public alertCtrl: AlertController,private loaderService:LoaderService,private platform: Platform) { 
    if(this.router.url=="/dashboard"){
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(666666, () => {
      if(this.constructor.name === 'DashboardPage'){
      this.LogOutAlert();
       }
     });
    }
    this.activatedRoute.params.subscribe((path) => {
      // Do whatever in here
 });
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
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
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
