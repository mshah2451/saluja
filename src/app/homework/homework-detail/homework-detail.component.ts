import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeworkDetails } from '../Homework';
import {HomeworkService} from '../homework-service';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx'
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.component.html',
  styleUrls: ['./homework-detail.component.scss'],
})
export class HomeworkDetailComponent implements OnInit {
  @Input() homework : HomeworkDetails;
  
  constructor(private modalCtrl: ModalController,
    private homeworkService:HomeworkService,
    private transfer: FileTransfer, 
    private file: File) 
  {}

  ngOnInit() {
    
  }

  private fileTransfer: FileTransferObject; 
  

  public download() {  
    const fileName="myfile";
      //here encoding path as encodeURI() format.  
      let url = encodeURI(`https://app.salujagoldschool.com/UploadHomework/9932d775-eb22-43da-8bb9-66f48ba41714.jpg`);  
      //here initializing object.  
      this.fileTransfer = this.transfer.create();  
      // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
      this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true).then((entry) => {  
          //here logging our success downloaded file path in mobile.  
          console.log('download completed: ' + entry.toURL());  
      }, (error) => {  
          //here logging our error its easier to find out what type of error occured.  
          console.log('download failed: ' + error);  
      });  
  }
  

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
