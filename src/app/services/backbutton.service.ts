import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AlertController,Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  constructor
  (
    private router: Router,
    public alertCtrl: AlertController,
    private platform:Platform
  ) { }
  backButtonSubscription;

  addSubscription(){
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(666666, () => {
      if(this.constructor.name === 'DashboardPage'){
      this.LogOutAlert();
       }
     });
  }

  backNavDetech() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Hide loading indicator
        if(event.url==='/dashboard'){
          this.addSubscription();
        }
    }
      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          if(event.url!=='/dashboard'){
          this.backButtonSubscription.unsubscribe();
          }
      }
  });
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
