import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeworkDetails } from '../Homework';
import {HomeworkService} from '../homework-service';
import {FileTransfer, FileTransferObject,FileUploadOptions} from '@ionic-native/file-transfer/ngx'
import { File } from '@ionic-native/file/ngx';
import { AuthService } from 'src/app/auth/auth.service';
import {FileDowmloaderService} from '../../services/file.dowmloader.service'

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
    private file: File,
    private authService:AuthService,
    private fileDowmloaderService:FileDowmloaderService
    ) 
  {}

  ngOnInit() {
    
  }

  private fileTransfer: FileTransferObject; 
  

  public download(url: string) { 
    const urls = url.split(',');
    for (let fileCount = 0; fileCount < urls.length; fileCount++) { 
      let fileURL = urls[fileCount];
      const urlArray=fileURL.split('/');
      const fileName=urlArray[urlArray.length-1];
      this.fileDowmloaderService.downloadFile(fileURL,fileName);
    }
  }

   // const fileName="myfile";
    // let token='';
    // this.authService.token.subscribe(val=>token=val);
    // const options: FileUploadOptions = {
    //   fileKey: 'file',
    //   headers: {
    //     "Authorization":"Bearer "+`${token}`
    //   }
    // };
    //   //here encoding path as encodeURI() format.  
    //   let url = encodeURI(`https://app.salujagoldschool.com/UploadHomework/9932d775-eb22-43da-8bb9-66f48ba41714.jpg`);  
    //   //here initializing object.  
    //   this.fileTransfer = this.transfer.create();  
    //   // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    //   this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true,options).then((entry) => {  
    //       //here logging our success downloaded file path in mobile.  
    //       console.log('download completed: ' + entry.toURL());  
    //   }, (error) => {  
    //       //here logging our error its easier to find out what type of error occured.  
    //       console.log('download failed: ' + error);  
    //   });  
  

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
