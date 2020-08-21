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
  
  
export class HomeworkUploadDetails {
 constructor(public EnrollmentCode: string,
 public Classid: number,
 public  SectionId: number,
 public SubjectId: number,
 public Uploadedby: number,
 public DeadlineDate: string,
 public UploadeOn: string,
 public Filepath: string,
 public FileName: string,
 public  AssId: string,
 public  Remark:string){}
}
  