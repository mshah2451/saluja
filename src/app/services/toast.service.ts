import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: Toast) {

  }
  presentToast() {
    this.toastCtrl.show(`I'm a toast`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
