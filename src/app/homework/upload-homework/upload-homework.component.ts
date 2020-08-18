import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@ionic-native/file-transfer/ngx'
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { JsonPipe } from '@angular/common';
import { BaseURL } from 'src/app/share/Utility/baseURL';
// function base64toBlob(base64Data, contentType) {
//   contentType = contentType || '';
//   const sliceSize = 1024;
//   const byteCharacters = window.atob(base64Data);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);

//   for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);

//     const bytes = new Array(end - begin);
//     for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   return new Blob(byteArrays, { type: contentType });
// }

@Component({
  selector: 'app-upload-homework',
  templateUrl: './upload-homework.component.html',
  styleUrls: ['./upload-homework.component.scss'],
})

export class UploadHomeworkComponent implements OnInit {
image:any;
fileTransfer:FileTransferObject; 
  constructor
  (private modalCtrl: ModalController,
  private transfer:FileTransfer,
  private file:File,
  private filepath:FilePath,
  private filechooser:FileChooser
  ) { }
  form: FormGroup;
  ngOnInit() {
  }
  
  onLocationPicked() {
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
 
  uploadFile(){
  this.filechooser.open()
  .then((uri)=>{
      this.filepath.resolveNativePath(uri).then((nativePath)=>{
        this.fileTransfer=this.transfer.create();
        this.fileTransfer.upload(nativePath,`${BaseURL.baseURLAPI}UploadFile`)
        .then((data)=>{
           alert(JSON.stringify('transfer done= '+ data))
        },(err)=>{
          alert('Error aa gyi= '+JSON.stringify(err))
        })
      },
      (err)=>{
        alert(JSON.stringify(err));
      })
  },(err)=>{
    alert(JSON.stringify(err));
  })

  }

  // onBookPlace() {
  //   if (!this.form.valid ) {
  //     return;
  //   }

  //   this.modalCtrl.dismiss(
  //     {
  //       bookingData: {
  //         firstName: this.form.value['remark'],
  //         lastName: this.form.value['file'],
        
  //       }
  //     },
  //     'confirm'
  //   );
  // } 
  // upload(str:any)
  // {
  //   const formData = new FormData();

  //   this.image=str.target.files[0];

  //   formData.append('files[]', this.image);
  //   console.log(formData,this.image);
  //   // this.http.post("http://localhost/test/test.php",formData)
  //   // .subscribe((data:any)=>{
  //   //   console.log(data);
  //   // })
  //   console.log(str);
  // }
  // onCancel() {
  //   this.modalCtrl.dismiss(null, 'cancel');
  // }
  // onImagePicked(imageData: string | File) {
  //   let imageFile;
  //   if (typeof imageData === 'string') {
  //     try {
  //       imageFile = base64toBlob(
  //         imageData.replace('data:image/jpeg;base64,', ''),
  //         'image/jpeg'
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       return;
  //     }
  //   } else {
  //     imageFile = imageData;
  //   }
  //   this.form.patchValue({ image: imageFile });
  // }

  

}
