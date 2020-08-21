import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx'
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { JsonPipe } from '@angular/common';
import { BaseURL } from 'src/app/share/Utility/baseURL';
import { AuthService } from 'src/app/auth/auth.service';
import { HomeworkService } from '../homework-service';
import { async } from '@angular/core/testing';
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
  public homeservice:HomeworkService
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

          // response
          //     .then(function(success) {
          //       alert(JSON.stringify(success));  
          //    //   this.homeservice.UploadHomeworkDetail()                 
          //     })
          //     .catch(function(error) {
          //       alert(JSON.stringify(error));          
          //     });
      })
      .catch(error => {
        alert(JSON.stringify(error));        
          //something wrong with getting file infomation
      });
}
async uploadFile(fileMeta) {
  const homeworkService=this.homeservice;
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
        alert(JSON.stringify(fileUploadResult));
        var dataaaaa=  await   homeworkService.UploadHomeworkDetail(new HomeworkUploadDetails("12252",
        3,2,4,4,"","",fileUploadResult.response[0],"","123",""));

        alert(JSON.stringify(dataaaaa));
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
