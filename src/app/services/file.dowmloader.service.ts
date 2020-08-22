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
          subPath: 'MyFile.apk'
      }
  };
    this.downloader.download(request)
          .then((location: string) => console.log('File downloaded at:'+location))
          .catch((error: any) => console.error(error));
  }
}
