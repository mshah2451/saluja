import { Component, OnInit } from '@angular/core';
import { ReportcardServiceService } from './reportcard-service.service';
import { EvalutionType } from '../Model/evalutionType';
import { ResultType } from '../Model/resultType';
import { SessionMaster } from '../Model/SessionMaster';
import { NgForm } from '@angular/forms';
import { DowloadResultCard } from '../Model/DowloadResultCard';
import { Downloader } from '@ionic-native/downloader/ngx';
import { FileDowmloaderService } from '../services/file.dowmloader.service';

@Component({
  selector: 'app-reportcard',
  templateUrl: './reportcard.page.html',
  styleUrls: ['./reportcard.page.scss'],
})
export class ReportcardPage implements OnInit {

  constructor( private reportCardService:ReportcardServiceService,private downloader: FileDowmloaderService) { }
  evalutionType:EvalutionType[]
  evalutionTypeInner:EvalutionType[]
  resultType:ResultType[]
  sessionyear:SessionMaster[]
  evalutiontypeId:number;
  resulttype:number;
  session:number;

  
  ngOnInit() {
    this.reportCardService.getReportCardtype().subscribe(x=>{
      this.evalutionTypeInner=x.Evalution;
      this.resultType= x.resultType;
      this.sessionyear= x.SessionMasters;
      });
  }
  filterResultType(filterVal:any){
    if (filterVal != "5" && filterVal != "3") 
{
this.evalutionType=this.evalutionTypeInner;
}
else{
  this.evalutionType=[]
}
}

onSubmit(form: NgForm) {
  // if (!form.valid) {
  //   return;
  // }
  let downloadResultCard: DowloadResultCard={admissionid:"",levelid:this.evalutiontypeId,
    resultType:this.resulttype,sessionId:this.session}

  this.reportCardService.DownloadReportCardtype(downloadResultCard).subscribe(x=>{
    this.downloader.downloadFile(x.Data.d,x.Data.resultType)
  });
  form.reset();
}

}
