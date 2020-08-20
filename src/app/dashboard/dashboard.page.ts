import { Component, OnInit } from '@angular/core';
import {studentDetails} from '../model/studentDetails'
import {DashboardService} from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isLoading:boolean=false;
  studentDetail:studentDetails;
  constructor(private dashboardService:DashboardService) { 
   
  }

  ngOnInit() {
    this.isLoading=true;
    this.dashboardService.getStudentDetails().subscribe(studentDetail=>{
      this.studentDetail=studentDetail;
      this.isLoading=false;
    });
  }

}
