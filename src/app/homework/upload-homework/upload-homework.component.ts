import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

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
  constructor(private modalCtrl: ModalController) { }
  form: FormGroup;
  ngOnInit() {
    


  }
  
  onLocationPicked() {
  }

  onBookPlace() {
    if (!this.form.valid ) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value['remark'],
          lastName: this.form.value['file'],
        
        }
      },
      'confirm'
    );
  } 
  upload(str:any)
  {
    const formData = new FormData();

    this.image=str.target.files[0];

    formData.append('files[]', this.image);
    console.log(formData,this.image);
    // this.http.post("http://localhost/test/test.php",formData)
    // .subscribe((data:any)=>{
    //   console.log(data);
    // })
    console.log(str);
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
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
