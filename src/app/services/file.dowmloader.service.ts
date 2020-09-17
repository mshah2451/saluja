import { Injectable } from '@angular/core';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileDowmloaderService {

  constructor(private downloader: Downloader) { }

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
    this.downloader.download(request)
          .then((location: string) => alert(JSON.stringify(location) ))
          .catch((error: any) =>{
            console.error(error);
          } );
  }
}

