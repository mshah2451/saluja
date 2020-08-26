import { Component, OnInit } from '@angular/core';
import {AttendanceService} from '../services/attendance.service';
import {LoaderService} from '../services/loader.service';
@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {

  constructor(private attendanceService:AttendanceService
    ,private loaderService:LoaderService) { }
  currentDate:Date;
  calendar={
    mode:'month',
    currentDate : this.currentDate
  };
  totalPresent:number=0;
  totalAbsent:number=0;
  weekDayName:string="";
  monthName:string="";
  yearName:string="";

  ngOnInit() {
   const currentDate =new Date();
   this.updateStudentAttendence(currentDate);
  }

  updateStudentAttendence(date:Date){
    try{
    this.loaderService.showLoader();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.attendanceService.getAttendaceByStudentId(month,year).subscribe(attendence=>{
      this.totalPresent = attendence[0][0].Total_Present;
      this.totalAbsent = attendence[0][0].Total_Absent
      this.updateDateObject(date);
      this.loaderService.hideLoader();
      });
    }
    finally{
      this.loaderService.hideLoader();
    }
  }

  updateDateObject(date:Date){
    this.weekDayName=this.getWeekDayName(date);
    this.monthName=this.getMonthName(date);
    this.yearName=this.getYear(date).toString();
  }

  onCurrentDateChanged(date:Date) {
    this.updateStudentAttendence(date);
  }

  next(){
  var swiper=document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
  }

  back(){
    var swiper=document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  reloadSource(startTime, endTime){
      console.log('reloadSource');
      console.log(startTime);
      console.log(endTime);
    }

  onEventSelected(event:any){
    console.log('onEventSelected');
    console.log(event);
  }

  onViewTitleChanged(event:any){
    console.log('onViewTitleChanged');
    console.log(event);
  }

  onTimeSelected(event:any){
    console.log('onTimeSelected');
    console.log(event);
  }

  getWeekDayName(date:Date){
    var weekNameArray=["Sunday","Monday","Tuesday", "Wednesday","Thrusday","Friday","Saturday"];
    return weekNameArray[date.getDay()];
  }

  getMonthName(date:Date) {
    const monthNameArray = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return monthNameArray[date.getMonth()];
  }

  getYear(date:Date) {
   return date.getFullYear();
  }

  
}
