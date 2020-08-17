import { Component, OnInit } from '@angular/core';
import { UploadHomeworkComponent } from './upload-homework/upload-homework.component';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Homework } from './Homework';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
homework:Homework;
  constructor(  private modalCtrl: ModalController,    
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }
  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop();
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: UploadHomeworkComponent,
       componentProps: { selectedPlace: this.homework, selectedMode: mode }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking place...' })
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              // this.bookingService
              //   .addBooking(
              //     this.place.id,
              //     this.place.title,
              //     this.place.imageUrl,
              //     data.firstName,
              //     data.lastName,
              //     data.guestNumber,
              //     data.startDate,
              //     data.endDate
              //   )
              //   .subscribe(() => {
              //     loadingEl.dismiss();
              //   });
            });
        }
      });
  }
}
