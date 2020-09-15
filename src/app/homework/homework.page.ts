import { Component, OnInit } from '@angular/core';
import { UploadHomeworkComponent } from './upload-homework/upload-homework.component';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Homework ,HomeworkDetails } from './Homework';
import {HomeworkService} from './homework-service'
import { HomeworkDetailComponent } from './homework-detail/homework-detail.component';
import { ToastService } from '../services/toast.service';
import * as moment from 'moment';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { homeworkSubjectComponent } from './homework-subject/homework.subject.component';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
homework:Homework;
homeworkDetails:HomeworkDetails[];
  homeworkDetail: HomeworkDetails;
  subjectGroupArray: Array<any>;
  constructor(private modalCtrl: ModalController,    
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private homeworkService:HomeworkService
    ) { }

  ngOnInit() {
    this.homeworkDetails = [];
    this.getHomeWorkDetails();
    console.log(this.homeworkDetails);
  }

  getFormatedDate(date:string) { 
   return moment(date).format("DD/MM/YYYY");
  }

  getHomeWorkDetails() { 
    this.subjectGroupArray = [];
    this.homeworkService.getHomeWorkById().subscribe(map =>{
      map.forEach(element => {
        this.homeworkDetails.push
          (
            {
              AssId: element.AssId,
              AssignedBy: element.AssignedBy,
              Date: this.getFormatedDate(element.Date),
              DownloadFileURL: element.FilePath,
              LastUploadDate: this.getFormatedDate(element.LastSubmissionDate),
              Status: element.Status,
              Subject: element.Subject,
              SubjectId: element.SubjectId
            }
          );
        if (!this.subjectGroupArray.some(subject => subject.SubjectId === element.SubjectId)) {
          this.subjectGroupArray.push({
            Subject: element.Subject,
            SubjectId: element.SubjectId,
            SubjectCount: 0
          });
        }
      });
      this.subjectGroupArray= [... this.subjectGroupArray.map(subject => {
        subject.SubjectCount = this.homeworkDetails
          .filter(x => x.SubjectId === subject.SubjectId)
          .length;
        subject.Subject = subject.Subject;
        subject.SubjectId = subject.SubjectId;
        return subject;
      })];
    });
  }

  showHomeBySubject(subjectId:number) { 
    const studentWiseSubjectArray = this.homeworkDetails.filter(x => {
      if (x.SubjectId === subjectId) {
        return x;
      }
    });

    this.openSubjectComp('select', studentWiseSubjectArray);

  }

  openSubjectComp(mode: 'select' | 'random',studentWiseSubjectArray : HomeworkDetails[]) {
    
    this.modalCtrl
      .create({
        component: homeworkSubjectComponent,
        componentProps:
        {
          subjects: studentWiseSubjectArray ,
          selectedMode: mode
        }
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

}
