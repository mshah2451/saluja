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
import { SharedServiceService } from 'src/app/services/SharedService.service';
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

  fileUploadArray: Array<any>;
  recursiveCount=1;
  uploadbuttonDisable=false;
 
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
  private http:HttpClient,
    private shareService:SharedServiceService
  ) { }
  form: FormGroup;
  ngOnInit() {
    this.GetUploadFileName();
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
      text: 'Yes',  
      handler:async data => {  
        this.loaderService.showLoader();
        const fileTransfer: FileTransferObject = this.transfer.create();
        const fileUploadResult = await fileTransfer.upload(fileMeta.nativeURL, `${BaseURL.baseURLAPI}UploadFile`, options);
try{

        if( this.recursiveCount > 1){
          this.remark="";
        }

        homeworkService.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
          ,this.homework.SubjectId,4,null,null,JSON.parse(fileUploadResult.response)[0],fileMeta.fileNameFromPath,this.homework.AssId,this.remark
          )).subscribe(x=>{
          this.loaderService.hideLoader();
          this.toastService.presentToast('Your files were successfully saved',2000); 
          // if(this.recursiveCount <= 3){
            this.GetUploadFileName();
            this.recuresiveUpload(); 
          //}
          this.shareService.onMainEvent.emit(this.homework.AssId);
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
     //   this.onCancel();
     this.recursiveCount=0;
       return
      }  
    } ]  
  }); 
  await alertTest.present();  
}

 async recuresiveUpload() { 
    this.recursiveCount=this.recursiveCount+1;
    const alertTest = await this.alertCtrl.create({  
      header: 'Do you want to submit more files without a remark? Click Yes or else Cancel.',  
      buttons: [ { 
        text: 'Yes',  
        handler:async data => {  
          this.selectAFile();
        }   
      }, {
        text: 'Cancel',  
        handler: data => {  
         // this.onCancel();
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
  this.loaderService.showLoader();
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
      const filename=Math.floor(Math.random() * 100000) + 1+'.jpg'; 
      homeservice.uploadImage(imageFile,filename).subscribe(fileUploadResult=>{
      homeservice.UploadHomeworkDetail(new HomeworkUploadDetails(studentProfile.AdmissionId,studentProfile.ClassId,studentProfile.SectionId
        ,this.homework.SubjectId,4,null,null,fileUploadResult[0],filename.toString(),this.homework.AssId,this.remark
        )).subscribe(x=>{
      
        this.toastService.presentToast('Your files were successfully saved',2000);  
        this.shareService.onMainEvent.emit(this.homework.AssId);
        this.GetUploadFileName();
        this.loaderService.hideLoader();
      })
    })
    } catch (error) {
      this.loaderService.hideLoader();
    }
    finally{
      this.loaderService.hideLoader();
    }
  }
  
}
async DeleteFile(AssId:number){
  const alertTest = await this.alertCtrl.create({  
    header: 'Do you want to delete File? Click Yes or else Cancel.',  
    buttons: [ { 
      text: 'Yes',  
      handler:async data => {  
        this.loaderService.showLoader();
        this.homeservice.DeleteUploadFile(AssId).subscribe(fileName=>
          {
           this.loaderService.hideLoader();
            this.toastService.presentToast('file has been deleted successfully',2000); 
            this.GetUploadFileName();
          })
      }   
    }, {
      text: 'Cancel',  
      handler: data => {  
       // this.onCancel();
        return;
      }  
    } ]  
  }); 
  await alertTest.present(); 
 
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

getExtensionImage(ext:string){
let extension="";
  switch (ext.trim().toLowerCase()){
    case "jpg":
    case "png":
    case "gif":
    case "jpeg":
        extension="/assets/hwjpg.png"
        break;
    case "mp3":
    case "mp4":
    extension="/assets/mp3.png"
    break;

    case "pdf":
    extension="/assets/pdf.png"
    break;

    default:
      ext="/assets/hwjpg.png";


  } 
  return extension;

}


GetUploadFileName(){
  const AssId= this.homework.AssId;
  this.fileUploadArray = [];
  var regex = /(\d+)/g;
var d = this.homework.LastUploadDate.match(regex);
var out = d[2] + "-" + d[1] + "-" + d[0];
let lastdate= new Date(out);
let today=new Date();      
var todayDateFormatted = new Date(today.getFullYear(),today.getMonth(),today.getDate());

if(lastdate<todayDateFormatted){
  this.uploadbuttonDisable=true;
 }
 else{
  this.uploadbuttonDisable=false;
 }
  this.homeservice.GetUploadFileName(AssId).subscribe(fileName=>
    {

      if(fileName != null)
      {
        //fileUploadArray
        
       
      
      const fileArray=  fileName;
        for (let fileCount = 0; fileCount < fileArray.length; fileCount++) { 
          let fileNameObj = fileArray[fileCount];
 
          const arr=fileNameObj.FileName.split('.');
          if(arr.length==2){
            this.fileUploadArray.push(
              {
              Name:arr[0],
              Ext : arr[1],
              ImagePick:this.getExtensionImage(arr[1]),
              FullName:fileNameObj.FileName,
              FileId:fileNameObj.FileId
            }
            );

          }
        }

        this.fileUploadArray= [...this.fileUploadArray]
        
      }
    });
}

}



