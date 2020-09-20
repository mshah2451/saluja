import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  backButtonSubscription;
 type = 'password';
 showPass = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {

    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
     });
     
  }

  showPassword() {
    this.showPass = !this.showPass;
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
 }
 

  authenticate(email: string, password: string,otp:string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.ResetPassword(email, password,otp);
        }
        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            if (this.isLogin)
            {
            this.router.navigateByUrl('/dashboard');
            }
            else{
              this.showAlert("Password has been Update","");
              this.isLogin=true;
            }
          },
          errRes => {
            loadingEl.dismiss();
            // const code = errRes.error.error.message;
            const code = errRes;
            let message ="";
            let  header="Authentication failed";
            if (this.isLogin){
             message = 'Could not Login, please Check Userid or Password.';
            }else{
              message= 'Could not ResetPassword, please Check User id or Invalid login.';
            }
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message,header);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    // if (!form.valid) {
    //   return;
    // }
    const email = form.value.email;
    const password = form.value.password;
    const otp = form.value.otp;
    this.authenticate(email, password,otp);
    form.reset();
  }

  SentOtp(userId:any){
    this.authService.sendOtp(userId).subscribe(x=>{
      console.log(`success`)
      this.showAlert('OTP successfully has sent on your registered mobile number','OTP');
      console.log(x)
    },err=>{
      this.showAlert('OTP not sent. Invalid user id','OTP');
      console.log(err)
    })
  }

  private showAlert(message: string,header:string ) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
