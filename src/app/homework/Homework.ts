export class Homework {
    constructor(
  
      public title: string,
      public description: string,
      public imageUrl: string,
     
    ) {}
  }

  
export interface HomeworkDetails {
  AssId : string;
  Subject: string;
  AssignedBy:string;
  Date:string;
  LastUploadDate:string;
  Status:string;
  DownloadFileURL:string;
}
  
  
export interface HomeworkUploadDetails {
  enrollmentCode: string,
  classid: number,
  sectionId: number,
  subjectId: number,
  uploadedby: number,
  deadlineDate: string,
  uploadeOn: string,
  filepath: string,
  FileName: string,
  AssId: string,
  Remark:string
}
  