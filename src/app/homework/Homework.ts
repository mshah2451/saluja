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
 constructor(  public enrollmentCode: string,
  public classid: number,
  public sectionId: number,
  public subjectId: number,
  public uploadedby: number,
  public deadlineDate: string,
  public uploadeOn: string,
  public filepath: string,
  public FileName: string,
  public AssId: string,
  public Remark:string){}
}

// export class HomeworkUploadDetails {
//   constructor(
//   public enrollmentCode: string,
//   public classid: number,
//   public sectionId: number,
//   public subjectId: number,
//   public uploadedby: number,
//   public deadlineDate: string,
//   public uploadeOn: string,
//   public filepath: string,
//   public FileName: string,
//   public AssId: string,
//   public Remark:string
//   ){}
// }