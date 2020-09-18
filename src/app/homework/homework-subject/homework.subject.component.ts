import { Component, OnInit,Input } from '@angular/core';
import { ModalController, LoadingController, ActionSheetController } from '@ionic/angular';
import { HomeworkDetails } from '../Homework';
import { HomeworkService } from '../homework-service';
import * as moment from 'moment';
import { UploadHomeworkComponent } from '../upload-homework/upload-homework.component';
import { HomeworkDetailComponent } from '../homework-detail/homework-detail.component';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/SharedService.service';

@Component({
  selector: 'homework-subject',
  templateUrl: './homework.subject.component.html',
  styleUrls: ['./homework.subject.component.scss'],
})
export class homeworkSubjectComponent implements OnInit { 
  @Input() subjects : HomeworkDetails[];

homeworkDetails:HomeworkDetails[];
  homeworkDetail: HomeworkDetails;
  subjectGroupArray: Array<any>;
  constructor(private modalCtrl: ModalController,    
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private homeworkService:HomeworkService,
    private router:Router,
    private shareService:SharedServiceService
    ) { }

  ngOnInit() { 
    this.shareService.onMainEvent.subscribe(
      (id) => {
        this.subjects.filter(x=>x.AssId==id)[0].Status="Complete";
  
      }
   );
  }

  onBookPlace(id : string) {
    this.subjects.map(x=>{
      if(x.AssId===id)
      {
        this.homeworkDetail=x;     
      }
     });
    this.openHomeworkModal('select');
  }

  getFormatedDate(date:string) { 
    return moment(date).format("DD/MM/YYYY");
   }

  onViewHomework(id : string) {
   this.homeworkService.getHomeWorkById().subscribe(map=>      
    map.forEach(element => {
      if (element.AssId === id) { 
        this.homeworkDetail = Object.assign({
            AssId:element.AssId,
            AssignedBy:element.AssignedBy,
            Date:  this.getFormatedDate(element.Date) ,
            DownloadFileURL:element.FilePath,
            LastUploadDate:this.getFormatedDate(element.LastSubmissionDate),
            Status:element.Status,
            Subject:element.Subject,
            SubjectId:element.SubjectId
        });
        this.openViewModal();
      }
    })
  );
   console.log(this.homeworkDetail);
  
  }
  
  openHomeworkModal(mode: 'select' | 'random') {
    
    console.log(mode);
    this.modalCtrl
      .create({
        component: UploadHomeworkComponent,
        componentProps:
        {
          selectedMode: mode,
          homework: this.homeworkDetail
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
  
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
   setTimeout(()=>{
    this.router.navigateByUrl('/homework' );
   },500);
   this.router.navigateByUrl('/dashboard' );
  }

}