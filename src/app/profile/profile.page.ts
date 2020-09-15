import { Component, OnInit } from '@angular/core';
import {DashboardService } from '../dashboard/dashboard.service';
import { studentDetails } from '../model/studentDetails';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  student: studentDetails;

  constructor(private dashboardService:DashboardService) { }
  
  ngOnInit() {
    this.dashboardService.studentProfile.subscribe(x => this.student=x);
  }

}
