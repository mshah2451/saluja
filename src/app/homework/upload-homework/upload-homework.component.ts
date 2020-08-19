import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx'
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { JsonPipe } from '@angular/common';
import { BaseURL } from 'src/app/share/Utility/baseURL';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.component.html',
  styleUrls: ['./upload-homework.component.scss'],
})

export class UploadHomeworkComponent implements OnInit {
  option: FileUploadOptions;
image:any;
fileTransfer:FileTransferObject; 
  constructor
  (private modalCtrl: ModalController,
  private transfer:FileTransfer,
  private file:File,
  private filepath:FilePath,
  private filechooser:FileChooser,
  private authService:AuthService
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

          const response: Promise < any > = this.uploadFile(
              fileMeta
              
          );

          response
              .then(function(success) {
                  //upload success message                       
              })
              .catch(function(error) {
                  //upload error message
              });
      })
      .catch(error => {
          //something wrong with getting file infomation
      });
}
uploadFile(fileMeta) {
  let token='';
this.authService.token.subscribe(val=>token=val);
  const options: FileUploadOptions = {
    fileKey: 'file',
    fileName: fileMeta.fileNameFromPath,
    headers: {
      'Content-Length': fileMeta.size,
      'Content-Type': fileMeta.type,
      "Authorization":"Bearer "+`${token}`
    },
    httpMethod: 'post',
    mimeType: fileMeta.type,
  };

  const fileTransfer: FileTransferObject = this.transfer.create();
  return fileTransfer.upload(fileMeta.nativeURL, `${BaseURL.baseURLAPI}UploadFile`, options);
}
  // uploadFile(){
  //   let token='';
  //   this.authService.token.subscribe(val=>token=val);
  //   let options: FileUploadOptions = {
  //     headers: {"Authorization":"Bearer "+`${token}`}
  //  }
  // this.filechooser.open()
  // .then((uri)=>{
  //     this.filepath.resolveNativePath(uri).then((nativePath)=>{
  //       this.fileTransfer=this.transfer.create();
  //       this.fileTransfer.upload(nativePath,`${BaseURL.baseURLAPI}UploadFile`,options)
  //       .then((data)=>{
  //          alert(JSON.stringify('transfer done= '+ data))
  //       },(err)=>{
  //         alert('Error aa gyi= '+JSON.stringify(err))
  //       })
  //     },
  //     (err)=>{
  //       alert(JSON.stringify(err));
  //     })
  // },(err)=>{
  //   alert(JSON.stringify(err));
  // })

  // }

  

}
