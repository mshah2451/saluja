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
import {LoaderService} from '../../services/loader.service';
import { Router } from '@angular/router';
import {ToastService} from '../../services/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.component.html',
  styleUrls: ['./upload-homework.component.scss'],
})

export class UploadHomeworkComponent implements OnInit {
  option: FileUploadOptions;
image:any;
fileTransfer:FileTransferObject; 
remark:string="";
  @Input() homework: HomeworkDetails;
  @Input() getHomeWorkDetails : Function;
  constructor
  (private modalCtrl: ModalController,
  private transfer:FileTransfer,
  private file:File,
  private filepath:FilePath,
  private filechooser:FileChooser,
  private authService:AuthService,
  public alertCtrl: AlertController,
  public homeservice:HomeworkService,
  private dashboarService:DashboardService,
  private loaderService:LoaderService,
  private router:Router,
  private toastService:ToastService,
  private camera: Camera,
  private http:HttpClient
  ) { }
  form: FormGroup;
  ngOnInit() {
  }
  
  onLocationPicked() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
    this.getHomeWorkDetails();
    window.location.assign('/homework');
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
        const response =await this.uploadFile(
              fileMeta
          );
      })
      .catch(error => {
            
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
    buttons: [ { 
      text: 'Submit',  
      handler:async data => {  
        this.loaderService.showLoader();
        const fileTransfer: FileTransferObject = this.transfer.create();
        const fileUploadResult = await fileTransfer.upload(fileMeta.nativeURL, `${BaseURL.baseURLAPI}UploadFile`, options);
try{

        homeworkService.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,this.homework.SubjectId,4,null,null,JSON.parse(fileUploadResult.response)[0],fileMeta.fileNameFromPath,this.homework.AssId,this.remark
          )).subscribe(x=>{
          this.loaderService.hideLoader();
          this.toastService.presentToast('Your files were successfully saved',2000);  
          this.recuresiveUpload(); 
        })
     
} catch(err){
  this.loaderService.hideLoader();
  console.log(JSON.stringify(err))
}
finally{
  this.loaderService.hideLoader();
}
      } 
    
    }, {
      text: 'Cancel',  
      handler: data => {  
        this.onCancel();
       return
      }  
    } ]  
  }); 
  await alertTest.present();  
}

 async recuresiveUpload() { 

    const alertTest = await this.alertCtrl.create({  
      header: 'If there are any pending files, You can hit submit',  
      buttons: [ { 
        text: 'Submit',  
        handler:async data => {  
          this.selectAFile();
        }   
      }, {
        text: 'Cancel',  
        handler: data => {  
          this.onCancel();
          return;
        }  
      } ]  
    }); 
    await alertTest.present(); 
  }
  
takepick(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  let studentProfile:studentDetails;
  this.dashboarService.studentProfile.subscribe(x=>{
    studentProfile =x;
  });
  
  this.camera.getPicture(options).then((imageData) => {
  var imageFile = base64toBlob(
    imageData.replace('data:image/jpeg;base64,', ''),
    'image/jpeg'
  );
  this.onImagePicked(imageData)
  });
}

onImagePicked(imageData: string | File) {
  let imageFile;
  const homeservice=this.homeservice;
  let studentProfile:studentDetails;
  this.dashboarService.studentProfile.subscribe(x=>{
    studentProfile =x;
  });
  if (typeof imageData === 'string') {
    try {
      imageFile = this.base64toBlob(
        imageData.replace('data:image/jpeg;base64,', ''),
        'image/jpeg'
      );
      const filename=Math.floor(Math.random() * 100000) + 1; 
       homeservice.uploadImage(imageFile).subscribe(x=>{
        console.log(JSON.stringify(x))
        homeservice.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,this.homework.SubjectId,4,null,null,JSON.parse(x.response)[0],filename.toString(),this.homework.AssId,this.remark
          )).subscribe(x=>{
          console.log(JSON.stringify(x));
          this.loaderService.hideLoader();
          this.toastService.presentToast('Your files were successfully saved',2000);
          this.router.navigateByUrl('/homework');
        })
      })
    } catch (error) {
     
    }
    finally{
      this.loaderService.hideLoader();
    }
  }
  
}

base64toBlob(base64Data, contentType) {
 
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  const data=new Blob(byteArrays, { type: contentType });
  return  data;
}

}



