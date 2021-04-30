import { Injectable } from '@angular/core';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class FileDowmloaderService {

  constructor(private downloader: Downloader,private loaderService:LoaderService,) { }

  downloadFile(URL:string,title:string)
  {
    var request: DownloadRequest = {
      uri: URL,
      title: title,
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: title
      }
  };
 
  try{
    this.downloader.download(request)
          .then((location: string) => {
            alert(JSON.stringify(location) )
           this.loaderService.hideLoader();
          })
          .catch((error: any) =>{
          this.loaderService.hideLoader();
            console.error(error);
          } );
  }catch(err){
    this.loaderService.hideLoader();
  }

  }
}

