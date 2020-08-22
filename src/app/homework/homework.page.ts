import { Component, OnInit } from '@angular/core';
import { UploadHomeworkComponent } from './upload-homework/upload-homework.component';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Homework ,HomeworkDetails } from './Homework';
import {HomeworkService} from './homework-service'
import { HomeworkDetailComponent } from './homework-detail/homework-detail.component';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
homework:Homework;
homeworkDetails:HomeworkDetails[];
homeworkDetail:HomeworkDetails;
  constructor(private modalCtrl: ModalController,    
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private homeworkService:HomeworkService
    ) { }

  ngOnInit() {
    this.homeworkDetails=[];
    this.homeworkService.getHomeWorkById().subscribe(map=>      
      map.forEach(element => {
        this.homeworkDetails.push
        (
          {
          AssId:element.AssId,
          AssignedBy:element.AssignedBy,
          Date:element.Date,
          DownloadFileURL:element.FilePath,
          LastUploadDate:element.LastSubmissionDate,
          Status:element.Status,
          Subject:element.Subject,
          SubjectId:element.SubjectId
         }
         )
      })
    );
    console.log(this.homeworkDetails);
  }

 
  
  onBookPlace(id : string) {
    this.homeworkDetails.map(x=>{
      if(x.AssId===id)
      {
        this.homeworkDetail=x;     
      }
     });
     console.log(this.homeworkDetail);
    this.openHomeworkModal('select');
  }

  onViewHomework(id : string) {
   this.homeworkDetails.map(x=>{
    if(x.AssId===id)
    {
      this.homeworkDetail=x;     
    }
   });
   console.log(this.homeworkDetail);
   this.openViewModal();
  }
  
  openHomeworkModal(mode: 'select' | 'random') {
    
    console.log(mode);
    this.modalCtrl
      .create({
        component: UploadHomeworkComponent,
       componentProps: { selectedPlace: this.homework, selectedMode: mode, homework: this.homeworkDetail}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Homework Upload..' })
            .then(loadingEl => {
              loadingEl.present();
            });
        }
      });
  }

  openViewModal() {    
    this.modalCtrl
      .create({
        component: HomeworkDetailComponent,
       componentProps: { homework: this.homeworkDetail}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Homework Upload...' })
            .then(loadingEl => {
              loadingEl.present();
            });
        }
      });
  }

}
