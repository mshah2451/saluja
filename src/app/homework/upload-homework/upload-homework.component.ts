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
  private dashboarService:DashboardService,
  private loaderService:LoaderService,
  private router:Router,
  private toastService:ToastService,
  private camera: Camera
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
        this.loaderService.showLoader();
        const fileTransfer: FileTransferObject = this.transfer.create();
        const fileUploadResult = await fileTransfer.upload(fileMeta.nativeURL, `${BaseURL.baseURLAPI}UploadFile`, options);
try{
        alert(JSON.stringify(fileUploadResult));
        homeworkService.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,this.homework.SubjectId,4,null,null,JSON.parse(fileUploadResult.response)[0],"file",this.homework.AssId,this.remark
          )).subscribe(x=>{
          console.log(JSON.stringify(x))
          alert(JSON.stringify(x));
          this.loaderService.hideLoader();
          this.toastService.presentToast('Your files were successfully saved',2000);
          this.router.navigateByUrl('/homework');
        })
     
}catch(err){
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
       return
      }  
    } ]  
  }); 
  await alertTest.present();  
}
takepick(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.loaderService.showLoader();
   alert(JSON.stringify(imageData));
   let base64Image = 'data:image/jpeg;base64,' + imageData;
   this.onImagePicked(base64Image);
  }, (err) => {
    alert(JSON.stringify(err));
    this.loaderService.hideLoader();
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
      homeservice.uploadImage(imageFile).subscribe(x=>{
        console.log(JSON.stringify(x))
        alert(JSON.stringify(x));
        // this.loaderService.hideLoader();
        // this.toastService.presentToast('File successfully uploaded!',2000);
        // this.router.navigateByUrl('/homework');

        homeservice.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,this.homework.SubjectId,4,null,null,JSON.parse(x.response)[0],"file",this.homework.AssId,this.remark
          )).subscribe(x=>{
          console.log(JSON.stringify(x))
          alert(JSON.stringify(x));
          this.loaderService.hideLoader();
          this.toastService.presentToast('Your files were successfully saved',2000);
          this.router.navigateByUrl('/homework');
        })
      })

    } catch (error) {
      alert(JSON.stringify(error));
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
  return new Blob(byteArrays, { type: contentType });
}

}



