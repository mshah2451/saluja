import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx'
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { BaseURL } from 'src/app/share/Utility/baseURL';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeworkService } from '../homework-service';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { studentDetails } from 'src/app/model/studentDetails';
import { HomeworkUploadDetails, HomeworkDetails } from '../Homework';



@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.component.html',
  styleUrls: ['./upload-homework.component.scss'],
})

export class UploadHomeworkComponent implements OnInit {
  option: FileUploadOptions;
image:any;
fileTransfer:FileTransferObject; 
@Input() homework : HomeworkDetails;
  constructor
  (private modalCtrl: ModalController,
  private transfer:FileTransfer,
  private file:File,
  private filepath:FilePath,
  private filechooser:FileChooser,
  private authService:AuthService,
  public alertCtrl: AlertController,
  public homeservice:HomeworkService,
  private dashboarService:DashboardService
  ) { }
  form: FormGroup;
  ngOnInit() {
  }
  
  onLocationPicked() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  getFileInfo(): Promise<any> {
    return this.filechooser.open().then(fileURI => {
        return this.filepath.resolveNativePath(fileURI).then(filePathUrl => {
            return this.file
                .resolveLocalFilesystemUrl(fileURI)
                .then((fileEntry: any) => {
                    return new Promise((resolve, reject) => {
                        fileEntry.file(
                            meta =>
                                resolve({
                                    nativeURL: fileEntry.nativeURL,
                                    fileNameFromPath: filePathUrl.substring(filePathUrl.lastIndexOf('/') + 1),
                                    ...meta,
                                }),
                            error => reject(error)
                        );
                    });
                });
        });
    });
}
 selectAFile() {

  this.getFileInfo()
      .then(async fileMeta => {

          //get the upload 
        //  const uploadUrl = await this.getUploadUrl(fileMeta);

          const response =await this.uploadFile(
              fileMeta
          );

    
      })
      .catch(error => {
        alert(JSON.stringify(error));        
          //something wrong with getting file infomation
      });
}
async uploadFile(fileMeta) {
  const homeworkService=this.homeservice;
  let studentProfile:studentDetails;
  this.dashboarService.studentProfile.subscribe(x=>{
    studentProfile =x;
  });
  let token='';
  this.authService.token.subscribe(val=>token=val);
  const options: FileUploadOptions = {
    fileKey: 'file',
    fileName: fileMeta.fileNameFromPath,
    headers: {
      "Authorization":"Bearer "+`${token}`
    },
    httpMethod: 'post',
    mimeType: fileMeta.type,
    chunkedMode:false
  };
  const alertTest = await this.alertCtrl.create({  
    header: 'Do you want to submit?',  
    message: 'Once the assignment submit,you can not be Submit again!!',  
    buttons: [ { 
      text: 'Submit',  
      handler:async data => {  
        const fileTransfer: FileTransferObject = this.transfer.create();
        const fileUploadResult = await fileTransfer.upload(fileMeta.nativeURL, `${BaseURL.baseURLAPI}UploadFile`, options);
try{
        alert(JSON.stringify(fileUploadResult));
        homeworkService.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,4,4,"",null,JSON.parse(fileUploadResult.response)[0],"","",""

          )).subscribe(x=>{
          console.log(JSON.stringify(x))
          alert(JSON.stringify(x));
        })
     
}catch(err){
  console.log(JSON.stringify(err))
}
      } 
    
    }, {
      text: 'Cancel',  
      handler: data => {  
       return
      }  
    } ]  
  }); 
  await alertTest.present();  
}


}
